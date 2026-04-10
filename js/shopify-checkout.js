/**
 * CRAVE Meal Prep Co. — Shopify Checkout Integration
 * Uses Shopify Buy SDK to create real checkout sessions.
 * Customers are redirected to Shopify's hosted checkout.
 * Orders appear in Shopify admin, payments go to your bank.
 */

var ShopifyCheckout = (function () {
  "use strict";

  var client = null;
  var productCache = {};
  var isReady = false;

  // ─── INITIALIZE ────────────────────────────────────────────
  function init() {
    if (!SHOPIFY_CONFIG.storefrontAccessToken) {
      console.warn(
        "[CRAVE] Shopify Storefront API token not configured. " +
        "Checkout will run in demo mode. " +
        "Set SHOPIFY_CONFIG.storefrontAccessToken in js/shopify-config.js"
      );
      return Promise.resolve(false);
    }

    // The Buy SDK is loaded from CDN in index.html
    if (typeof ShopifyBuy === "undefined") {
      console.error("[CRAVE] Shopify Buy SDK not loaded. Check script tag in index.html.");
      return Promise.resolve(false);
    }

    client = ShopifyBuy.buildClient({
      domain: SHOPIFY_CONFIG.domain,
      storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken
    });

    // Pre-fetch all products to build the variant ID cache
    return client.product.fetchAll(250).then(function (products) {
      products.forEach(function (product) {
        // Cache by handle
        productCache[product.handle] = product;
        // Also cache by a normalized title for fallback matching
        var normalizedTitle = product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        productCache["title:" + normalizedTitle] = product;
      });
      isReady = true;
      console.log("[CRAVE] Shopify checkout ready. " + products.length + " products loaded.");

      // Update meal images from Shopify if available
      updateMealImages(products);

      return true;
    }).catch(function (err) {
      console.error("[CRAVE] Failed to initialize Shopify:", err);
      return false;
    });
  }

  // ─── UPDATE MEAL IMAGES FROM SHOPIFY ──────────────────────
  function updateMealImages(products) {
    products.forEach(function (product) {
      if (!product.images || product.images.length === 0) return;
      var imageUrl = product.images[0].src;

      // Find matching meal by handle or title
      MEALS.forEach(function (meal) {
        var handle = SHOPIFY_CONFIG.productHandleMap[meal.id] || meal.id;
        if (product.handle === handle ||
            product.title.toLowerCase() === meal.name.toLowerCase()) {
          meal.image = imageUrl;
        }
      });
    });
  }

  // ─── FIND SHOPIFY PRODUCT ────────────────────────────────
  function findProduct(mealId) {
    var handle = SHOPIFY_CONFIG.productHandleMap[mealId] || mealId;

    // Try by handle first
    if (productCache[handle]) return productCache[handle];

    // Fallback: try by meal name
    var meal = null;
    for (var i = 0; i < MEALS.length; i++) {
      if (MEALS[i].id === mealId) { meal = MEALS[i]; break; }
    }
    if (meal) {
      var normalizedName = meal.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      if (productCache["title:" + normalizedName]) {
        return productCache["title:" + normalizedName];
      }
    }

    return null;
  }

  // ─── CREATE CHECKOUT ──────────────────────────────────────
  function createCheckout(cart) {
    if (!isReady || !client) {
      return Promise.reject(new Error("Shopify not initialized"));
    }

    // Build line items from cart
    var lineItems = [];
    var unmatchedMeals = [];

    Object.keys(cart).forEach(function (mealId) {
      var qty = cart[mealId];
      if (qty <= 0) return;

      var product = findProduct(mealId);
      if (product && product.variants && product.variants.length > 0) {
        lineItems.push({
          variantId: product.variants[0].id,
          quantity: qty
        });
      } else {
        // Track meals that couldn't be matched to Shopify products
        var meal = null;
        for (var i = 0; i < MEALS.length; i++) {
          if (MEALS[i].id === mealId) { meal = MEALS[i]; break; }
        }
        unmatchedMeals.push(meal ? meal.name : mealId);
      }
    });

    if (unmatchedMeals.length > 0) {
      console.warn("[CRAVE] These meals could not be matched to Shopify products:", unmatchedMeals);
    }

    if (lineItems.length === 0) {
      return Promise.reject(new Error("No products matched in Shopify catalog"));
    }

    // Create the checkout
    return client.checkout.create().then(function (checkout) {
      return client.checkout.addLineItems(checkout.id, lineItems);
    }).then(function (checkout) {
      return checkout.webUrl;
    });
  }

  // ─── PUBLIC API ───────────────────────────────────────────
  return {
    init: init,
    createCheckout: createCheckout,
    isConfigured: function () {
      return !!SHOPIFY_CONFIG.storefrontAccessToken;
    },
    isReady: function () {
      return isReady;
    }
  };
})();
