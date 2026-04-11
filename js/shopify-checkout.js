/**
 * CRAVE Meal Prep Co. — Shopify Checkout (Cart Permalink)
 *
 * Builds a real Shopify cart URL from the customer's selected meals.
 * No API, no token, no SDK. Just a URL with variant IDs that Shopify
 * itself parses and loads into a real checkout session. Orders appear
 * in Shopify admin. Payments process through your real Shopify gateway.
 */

var ShopifyCheckout = (function () {
  "use strict";

  function buildCheckoutUrl(cart) {
    var pairs = [];

    Object.keys(cart).forEach(function (mealId) {
      var qty = cart[mealId];
      if (qty <= 0) return;

      // Find the meal to get its Shopify variantId
      var meal = null;
      for (var i = 0; i < MEALS.length; i++) {
        if (MEALS[i].id === mealId) { meal = MEALS[i]; break; }
      }

      if (meal && meal.variantId) {
        pairs.push(meal.variantId + ":" + qty);
      } else {
        console.warn("[CRAVE] No variantId for meal:", mealId);
      }
    });

    if (pairs.length === 0) return null;

    var url = "https://" + SHOPIFY_CONFIG.storeDomain + "/cart/" + pairs.join(",");
    if (SHOPIFY_CONFIG.discountCode) {
      url += "?discount=" + encodeURIComponent(SHOPIFY_CONFIG.discountCode);
    }
    return url;
  }

  return {
    buildCheckoutUrl: buildCheckoutUrl,
    isConfigured: function () {
      return !!(SHOPIFY_CONFIG && SHOPIFY_CONFIG.storeDomain);
    }
  };
})();
