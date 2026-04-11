/**
 * CRAVE Meal Prep Co. — Shopify Checkout Configuration
 *
 * This integration uses Shopify's public cart permalink URLs:
 *   https://cravemealprepco.com/cart/VARIANT_ID:QTY,VARIANT_ID:QTY?discount=CODE
 *
 * No API token, no custom app, no SDK required. The variant IDs in
 * meals-data.js are public Shopify product variant IDs. When a customer
 * clicks checkout, we build this URL and redirect them — Shopify loads
 * the cart with all 10 meals pre-populated and applies the promo discount
 * automatically.
 *
 * ─── ONE-TIME SETUP ──────────────────────────────────────────
 * In Shopify Admin → Discounts → Create discount:
 *   • Type: Amount off products
 *   • Method: Discount code
 *   • Code: PROMO10 (or whatever you set below)
 *   • Value: enough to bring 10 meals to $99.90 total
 *     (e.g. if your regular price is $13.99/meal, set a fixed
 *      amount off per item of $4.00, or use "Set fixed price" to
 *      lock the bundle to $99.90)
 *   • Applies to: specific products (select the 20 promo meals)
 *   • Minimum quantity: 10 items
 *
 * Once the discount code is created in Shopify, paste it into
 * `discountCode` below. That's it — the landing page is live.
 */

var SHOPIFY_CONFIG = {
  // Empty = use relative URL (/cart/...) — we're already inside the Shopify store.
  storeDomain: "",

  // The discount code you created in Shopify Admin → Discounts.
  // Leave blank to send customers to checkout without a discount applied.
  discountCode: "PROMO10",

  // Promo price per meal (display only)
  promoPrice: 9.99,

  // Number of meals required (display only)
  requiredMeals: 10
};

/**
 * CRAVE Meal Prep Co. — Current Weekly Menu
 * All meals from the active cravemealprepco.com menu.
 * variantId and image are pulled from the live Shopify store.
 */

var SHOPIFY_CDN = "https://cdn.shopify.com/s/files/1/0714/2837/4783/files/";

const MEALS = [
  // ─── CHICKEN ──────────────────────────────────────────────
  {
    id: "chicken-waffles",
    name: "Chicken & Waffles",
    category: "chicken",
    calories: 496,
    protein: 26,
    carbs: 62,
    fat: 16,
    tags: [],
    isNew: false,
    variantId: "46942127685887",
    image: SHOPIFY_CDN + "7.21_MENU_UPDATE_PICS_18.png?v=1768264704"
  },
  {
    id: "buffalo-chicken-quesadilla",
    name: "Buffalo Chicken Quesadilla",
    category: "chicken",
    calories: 598,
    protein: 48,
    carbs: 43,
    fat: 26,
    tags: [],
    isNew: false,
    variantId: "47032696471807",
    image: SHOPIFY_CDN + "34.png?v=1768265818"
  },
  {
    id: "charred-peruvian-chicken",
    name: "Charred Peruvian Chicken",
    category: "chicken",
    calories: 439,
    protein: 38,
    carbs: 38,
    fat: 15,
    tags: ["GF"],
    isNew: false,
    variantId: "47177043804415",
    image: SHOPIFY_CDN + "36.png?v=1768265817"
  },
  {
    id: "kfc-bowl",
    name: "KFC Bowl",
    category: "chicken",
    calories: 486,
    protein: 33,
    carbs: 48,
    fat: 18,
    tags: ["GF"],
    isNew: false,
    variantId: "47155277857023",
    image: SHOPIFY_CDN + "7.21_MENU_UPDATE_PICS_19.png?v=1768266530"
  },
  {
    id: "general-tsos-chicken-meatballs",
    name: "General Tso's Chicken Meatballs",
    category: "chicken",
    calories: 423,
    protein: 30,
    carbs: 42,
    fat: 15,
    tags: [],
    isNew: false,
    variantId: "47131753021695",
    image: SHOPIFY_CDN + "Gen_T._meatballs.png?v=1771267251"
  },
  {
    id: "chipotle-chicken",
    name: "Chipotle Chicken",
    category: "chicken",
    calories: 406,
    protein: 34,
    carbs: 36,
    fat: 14,
    tags: ["GF"],
    isNew: false,
    variantId: "46942129094911",
    image: SHOPIFY_CDN + "49.png?v=1768348179"
  },
  {
    id: "teriyaki-chicken-potstickers",
    name: "Teriyaki Chicken Potstickers",
    category: "chicken",
    calories: 388,
    protein: 32,
    carbs: 38,
    fat: 12,
    tags: [],
    isNew: false,
    variantId: "48295243874559",
    image: SHOPIFY_CDN + "pot_stickers_2.png?v=1775508855"
  },
  {
    id: "chimichurri-chicken",
    name: "Chimichurri Chicken",
    category: "chicken",
    calories: 410,
    protein: 42,
    carbs: 29,
    fat: 14,
    tags: ["GF", "DF", "SF"],
    isNew: false,
    variantId: "46942163960063",
    image: SHOPIFY_CDN + "7.21_MENU_UPDATE_PICS_56.png?v=1770672884"
  },
  {
    id: "lemon-garlic-chicken",
    name: "Lemon Garlic Chicken",
    category: "chicken",
    calories: 336,
    protein: 40,
    carbs: 26,
    fat: 8,
    tags: ["GF", "DF", "SF"],
    isNew: false,
    variantId: "46942162321663",
    image: SHOPIFY_CDN + "7.21_MENU_UPDATE_PICS_58.png?v=1770672884"
  },

  // ─── BEEF ─────────────────────────────────────────────────
  {
    id: "creamy-gochujang-beef-noodles",
    name: "Creamy Gochujang Beef Noodles",
    category: "beef",
    calories: 579,
    protein: 42,
    carbs: 60,
    fat: 19,
    tags: [],
    isNew: true,
    variantId: "48295240892671",
    image: SHOPIFY_CDN + "pot_stickers_1.png?v=1775508414"
  },
  {
    id: "3-bean-beef-chili",
    name: "3 Bean Beef Chili",
    category: "beef",
    calories: 478,
    protein: 35,
    carbs: 44,
    fat: 18,
    tags: [],
    isNew: false,
    variantId: "47010791948543",
    image: SHOPIFY_CDN + "beef_chili.png?v=1772497981"
  },
  {
    id: "sweet-chili-beef",
    name: "Sweet Chili Beef",
    category: "beef",
    calories: 396,
    protein: 32,
    carbs: 40,
    fat: 12,
    tags: [],
    isNew: false,
    variantId: "47058190336255",
    image: SHOPIFY_CDN + "sweet_chili_beef_f5ee8ffe-3b5e-417d-bb85-752aaacb460c.png?v=1772498077"
  },
  {
    id: "beef-and-broccoli",
    name: "Beef & Broccoli",
    category: "beef",
    calories: 450,
    protein: 40,
    carbs: 25,
    fat: 21,
    tags: ["GF", "DF", "SF"],
    isNew: false,
    variantId: "46942160978175",
    image: SHOPIFY_CDN + "47.png?v=1768348179"
  },
  {
    id: "bacon-cheddar-burger",
    name: "Bacon Cheddar Burger",
    category: "beef",
    calories: 526,
    protein: 41,
    carbs: 50,
    fat: 18,
    tags: [],
    isNew: false,
    variantId: "46942154981631",
    image: SHOPIFY_CDN + "snack_wrap_4.png?v=1775508852"
  },
  {
    id: "shepards-pie",
    name: "Shepard's Pie",
    category: "beef",
    calories: 464,
    protein: 32,
    carbs: 48,
    fat: 16,
    tags: [],
    isNew: false,
    variantId: "47032706433279",
    image: SHOPIFY_CDN + "sheps_pie_1.png?v=1773791732"
  },

  // ─── TURKEY ───────────────────────────────────────────────
  {
    id: "pepper-jack-turkey-burger",
    name: "Pepper Jack Turkey Burger",
    category: "turkey",
    calories: 455,
    protein: 38,
    carbs: 45,
    fat: 15,
    tags: [],
    isNew: false,
    variantId: "47238054281471",
    image: SHOPIFY_CDN + "turkey_burger_b81e34d9-3621-41cd-aad7-27d9f61776ad.png?v=1772498077"
  },
  {
    id: "turkey-burger",
    name: "Turkey Burger",
    category: "turkey",
    calories: 421,
    protein: 37,
    carbs: 30,
    fat: 17,
    tags: ["GF", "DF", "SF"],
    isNew: false,
    variantId: "46942163337471",
    image: SHOPIFY_CDN + "43.png?v=1768348179"
  },

  // ─── BREAKFAST ────────────────────────────────────────────
  {
    id: "crave-breakfast-burrito",
    name: "Crave Breakfast Burrito",
    category: "breakfast",
    calories: 549,
    protein: 35,
    carbs: 46,
    fat: 25,
    tags: [],
    isNew: false,
    variantId: "47082322100479",
    image: SHOPIFY_CDN + "vbreakfast_burrito_28e3df28-d29a-4677-bb71-4691360b7527.png?v=1772498077"
  },
  {
    id: "steak-and-eggs",
    name: "Steak & Eggs",
    category: "breakfast",
    calories: 386,
    protein: 35,
    carbs: 30,
    fat: 14,
    tags: ["GF", "DF", "SF"],
    isNew: false,
    variantId: "46942164582655",
    image: SHOPIFY_CDN + "46.png?v=1768348180"
  },

  // ─── PREMIUM ──────────────────────────────────────────────
  {
    id: "shrimp-scampi",
    name: "Shrimp Scampi",
    category: "premium",
    calories: 480,
    protein: 30,
    carbs: 50,
    fat: 16,
    tags: [],
    isNew: false,
    variantId: "48322659123455",
    image: SHOPIFY_CDN + "scampi_2.png?v=1775508882"
  }
];

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

    // Use relative /cart/... URL when running inside the Shopify store itself.
    var base = SHOPIFY_CONFIG.storeDomain
      ? "https://" + SHOPIFY_CONFIG.storeDomain
      : "";
    var url = base + "/cart/" + pairs.join(",");
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

/**
 * CRAVE Meal Prep Co. — Promo Landing Page
 * 10 Meals for $9.99 Each — Meal Selection & Shopify Checkout
 */

(function () {
  "use strict";

  var PROMO_PRICE = 9.99;
  var REQUIRED_MEALS = 10;

  // ─── STATE ──────────────────────────────────────────────────
  var cart = {};
  var totalSelected = 0;
  var shopifyReady = false;

  // ─── DOM REFS ───────────────────────────────────────────────
  var mealsGrid = document.getElementById("mealsGrid");
  var selectedCountEl = document.getElementById("selectedCount");
  var progressFill = document.getElementById("progressFill");
  var reviewOrderBtn = document.getElementById("reviewOrderBtn");
  var cartCountEl = document.getElementById("cart-count");
  var mobileCartCount = document.querySelector(".mobile-cart-count");
  var cartItemsEl = document.getElementById("cartItems");
  var cartEmptyEl = document.getElementById("cartEmpty");
  var summaryCountEl = document.getElementById("summaryCount");
  var summaryTotalEl = document.getElementById("summaryTotal");
  var summaryNoteEl = document.getElementById("summaryNote");
  var remainingCountEl = document.getElementById("remainingCount");
  var checkoutBtn = document.getElementById("checkoutBtn");
  var checkoutModal = document.getElementById("checkoutModal");
  var confirmationModal = document.getElementById("confirmationModal");
  var modalClose = document.getElementById("modalClose");
  var checkoutForm = document.getElementById("checkoutForm");
  var placeOrderBtn = document.getElementById("placeOrderBtn");
  var orderIdEl = document.getElementById("orderId");
  var mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  var mobileNav = document.getElementById("mobileNav");
  var deliveryDateInput = document.getElementById("deliveryDate");

  // ─── INIT ───────────────────────────────────────────────────
  function init() {
    renderMeals(MEALS);
    bindCategoryFilters();
    bindHeaderEvents();
    bindCheckoutEvents();
    setMinDeliveryDate();
    animateOnScroll();
    startCountdown();
    initShopify();
  }

  // ─── SHOPIFY INIT ──────────────────────────────────────────
  function initShopify() {
    if (typeof ShopifyCheckout !== "undefined" && ShopifyCheckout.isConfigured()) {
      shopifyReady = true;
      console.log("[CRAVE] Shopify checkout ready — cart permalink mode");
    }
  }

  // ─── RENDER MEALS ───────────────────────────────────────────
  function renderMeals(meals) {
    mealsGrid.innerHTML = "";
    meals.forEach(function (meal) {
      var qty = cart[meal.id] || 0;
      var atLimit = totalSelected >= REQUIRED_MEALS;

      // Dietary badges
      var badgesHtml = "";
      if (meal.isNew) {
        badgesHtml += '<span class="meal-badge new-badge">NEW</span>';
      }
      if (meal.tags && meal.tags.length > 0) {
        meal.tags.forEach(function (tag) {
          badgesHtml += '<span class="meal-badge">' + tag + "</span>";
        });
      }

      // Macros in compact format matching real site
      var macrosText = meal.calories + " cal | " + meal.protein + "p | " + meal.carbs + "c | " + meal.fat + "f";

      // Image: use real photo if available, otherwise show placeholder
      var imageHtml;
      if (meal.image) {
        imageHtml =
          '<div class="meal-card-image has-photo">' +
            '<img src="' + meal.image + '" alt="' + meal.name + '" loading="lazy">' +
          '</div>';
      } else {
        imageHtml =
          '<div class="meal-card-image">' +
            '<span class="meal-plate-icon">' +
              '<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.15">' +
                '<circle cx="12" cy="12" r="10"/>' +
                '<circle cx="12" cy="12" r="6"/>' +
              '</svg>' +
            '</span>' +
          '</div>';
      }

      var card = document.createElement("div");
      card.className = "meal-card" + (qty > 0 ? " selected" : "");
      card.setAttribute("data-category", meal.category);
      card.innerHTML =
        (badgesHtml ? '<div class="meal-badges">' + badgesHtml + "</div>" : "") +
        imageHtml +
        '<div class="meal-card-body">' +
          '<h3>' + meal.name + '</h3>' +
          '<div class="meal-macros">' + macrosText + '</div>' +
          '<div class="meal-qty-control">' +
            '<button class="qty-btn" data-action="decrement" data-id="' + meal.id + '"' +
              (qty <= 0 ? " disabled" : "") + '>&minus;</button>' +
            '<span class="qty-display">' + qty + '</span>' +
            '<button class="qty-btn" data-action="increment" data-id="' + meal.id + '"' +
              (atLimit && qty <= 0 ? " disabled" : "") + '>+</button>' +
          '</div>' +
        '</div>';

      mealsGrid.appendChild(card);
    });

    bindMealCardEvents();
  }

  // ─── MEAL CARD EVENTS ──────────────────────────────────────
  function bindMealCardEvents() {
    var qtyBtns = mealsGrid.querySelectorAll(".qty-btn");
    qtyBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var action = btn.getAttribute("data-action");
        if (action === "increment") {
          addToCart(id);
        } else {
          removeFromCart(id);
        }
      });
    });
  }

  // ─── CART OPERATIONS ────────────────────────────────────────
  function addToCart(mealId) {
    if (totalSelected >= REQUIRED_MEALS) {
      showToast("You've selected all 10 meals! Review your order below.");
      return;
    }
    cart[mealId] = (cart[mealId] || 0) + 1;
    totalSelected++;
    updateUI();

    var meal = getMealById(mealId);
    if (meal) showToast(meal.name + " added!");

    if (totalSelected === REQUIRED_MEALS) {
      setTimeout(function () {
        showToast("All 10 meals selected! Scroll down to checkout.");
      }, 800);
    }
  }

  function removeFromCart(mealId) {
    if (!cart[mealId]) return;
    cart[mealId]--;
    totalSelected--;
    if (cart[mealId] <= 0) delete cart[mealId];
    updateUI();
  }

  function removeAllOfMeal(mealId) {
    if (!cart[mealId]) return;
    totalSelected -= cart[mealId];
    delete cart[mealId];
    updateUI();
  }

  // ─── UPDATE UI ──────────────────────────────────────────────
  function updateUI() {
    selectedCountEl.textContent = totalSelected;
    var pct = (totalSelected / REQUIRED_MEALS) * 100;
    progressFill.style.width = pct + "%";
    progressFill.classList.toggle("complete", totalSelected >= REQUIRED_MEALS);

    reviewOrderBtn.disabled = totalSelected < REQUIRED_MEALS;
    if (cartCountEl) cartCountEl.textContent = totalSelected;
    if (mobileCartCount) mobileCartCount.textContent = totalSelected;

    // Re-render meals with current filter
    var activeFilter = document.querySelector(".filter-btn.active");
    var category = activeFilter ? activeFilter.getAttribute("data-category") : "all";
    var filtered = category === "all" ? MEALS : MEALS.filter(function (m) { return m.category === category; });
    renderMeals(filtered);

    renderCart();

    summaryCountEl.textContent = totalSelected + " / " + REQUIRED_MEALS;
    var totalPrice = totalSelected * PROMO_PRICE;
    summaryTotalEl.textContent = "$" + totalPrice.toFixed(2);

    var remaining = REQUIRED_MEALS - totalSelected;
    if (remaining > 0) {
      summaryNoteEl.innerHTML = "Select <strong>" + remaining + "</strong> more meal" + (remaining !== 1 ? "s" : "") + " to complete your order.";
      summaryNoteEl.className = "summary-note";
    } else {
      summaryNoteEl.textContent = "Your order is complete! Proceed to checkout.";
      summaryNoteEl.className = "summary-note ready";
    }

    checkoutBtn.disabled = totalSelected < REQUIRED_MEALS;
    updateStickyCta();
  }

  // ─── RENDER CART ────────────────────────────────────────────
  function renderCart() {
    var keys = Object.keys(cart);
    if (keys.length === 0) {
      cartItemsEl.innerHTML = "";
      cartItemsEl.appendChild(cartEmptyEl);
      cartEmptyEl.style.display = "block";
      return;
    }

    cartEmptyEl.style.display = "none";
    var items = cartItemsEl.querySelectorAll(".cart-item");
    items.forEach(function (item) { item.remove(); });

    keys.forEach(function (id) {
      var meal = getMealById(id);
      if (!meal) return;
      var qty = cart[id];
      var lineTotal = (qty * PROMO_PRICE).toFixed(2);

      // Cart item image
      var cartImgHtml;
      if (meal.image) {
        cartImgHtml = '<div class="cart-item-icon has-photo"><img src="' + meal.image + '" alt="' + meal.name + '"></div>';
      } else {
        cartImgHtml =
          '<div class="cart-item-icon">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5"/></svg>' +
          '</div>';
      }

      var el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML =
        cartImgHtml +
        '<div class="cart-item-info">' +
          '<h4>' + meal.name + '</h4>' +
          '<span>' + meal.calories + ' cal | ' + meal.protein + 'p</span>' +
        '</div>' +
        '<div class="cart-item-qty">' +
          '<button class="cart-qty-btn" data-action="cart-dec" data-id="' + id + '">&minus;</button>' +
          '<span class="cart-qty-display">' + qty + '</span>' +
          '<button class="cart-qty-btn" data-action="cart-inc" data-id="' + id + '"' +
            (totalSelected >= REQUIRED_MEALS ? " disabled" : "") + '>+</button>' +
        '</div>' +
        '<span class="cart-item-price">$' + lineTotal + '</span>' +
        '<button class="cart-item-remove" data-id="' + id + '" title="Remove">&times;</button>';

      cartItemsEl.appendChild(el);
    });

    bindCartItemEvents();
  }

  function bindCartItemEvents() {
    var btns = cartItemsEl.querySelectorAll(".cart-qty-btn");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var action = btn.getAttribute("data-action");
        if (action === "cart-inc") addToCart(id);
        else removeFromCart(id);
      });
    });

    var removeBtns = cartItemsEl.querySelectorAll(".cart-item-remove");
    removeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        removeAllOfMeal(btn.getAttribute("data-id"));
      });
    });
  }

  // ─── CATEGORY FILTERS ──────────────────────────────────────
  function bindCategoryFilters() {
    var filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var category = btn.getAttribute("data-category");
        var filtered = category === "all" ? MEALS : MEALS.filter(function (m) { return m.category === category; });
        renderMeals(filtered);
      });
    });
  }

  // ─── HEADER EVENTS ─────────────────────────────────────────
  function bindHeaderEvents() {
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener("click", function () {
        mobileNav.classList.toggle("open");
      });
    }

    if (mobileNav) {
      var mobileLinks = mobileNav.querySelectorAll("a");
      mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          mobileNav.classList.remove("open");
        });
      });
    }

    reviewOrderBtn.addEventListener("click", function () {
      document.getElementById("cart-section").scrollIntoView({ behavior: "smooth" });
    });
  }

  // ─── CHECKOUT EVENTS ───────────────────────────────────────
  function bindCheckoutEvents() {
    checkoutBtn.addEventListener("click", function () {
      if (totalSelected < REQUIRED_MEALS) return;

      // If Shopify is connected, redirect to Shopify checkout
      if (shopifyReady) {
        handleShopifyCheckout();
        return;
      }

      // Otherwise open the contact-info-only modal (demo or fallback)
      checkoutModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    modalClose.addEventListener("click", closeCheckoutModal);
    checkoutModal.addEventListener("click", function (e) {
      if (e.target === checkoutModal) closeCheckoutModal();
    });

    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (shopifyReady) {
        handleShopifyCheckout();
      } else {
        handleDemoCheckout();
      }
    });
  }

  function closeCheckoutModal() {
    checkoutModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // ─── SHOPIFY CHECKOUT ─────────────────────────────────────
  function handleShopifyCheckout() {
    var checkoutUrl = ShopifyCheckout.buildCheckoutUrl(cart);

    if (!checkoutUrl) {
      console.error("[CRAVE] Could not build checkout URL — no valid variant IDs in cart");
      showToast("Something went wrong. Please try again.");
      return;
    }

    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "Redirecting to checkout...";
    if (placeOrderBtn) {
      placeOrderBtn.disabled = true;
      placeOrderBtn.textContent = "Redirecting...";
    }

    // Redirect to Shopify's real cart — it will load all selected
    // meals and apply the promo discount code automatically.
    window.location.href = checkoutUrl;
  }

  // ─── DEMO CHECKOUT (when Shopify not connected) ───────────
  function handleDemoCheckout() {
    var fields = checkoutForm.querySelectorAll("[required]");
    var valid = true;

    fields.forEach(function (field) {
      field.classList.remove("error");
      if (!field.value.trim()) {
        field.classList.add("error");
        valid = false;
      }
    });

    var emailField = document.getElementById("email");
    if (emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.classList.add("error");
      valid = false;
    }

    if (!valid) {
      showToast("Please fill in all required fields.");
      var firstError = checkoutForm.querySelector(".error");
      if (firstError) firstError.focus();
      return;
    }

    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = "Processing...";

    setTimeout(function () {
      var oid = "CRV-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
      orderIdEl.textContent = oid;

      closeCheckoutModal();
      confirmationModal.classList.add("open");
      document.body.style.overflow = "hidden";

      placeOrderBtn.disabled = false;
      placeOrderBtn.textContent = "Place Order — $99.90";

      var orderData = {
        orderId: oid,
        meals: Object.keys(cart).map(function (id) {
          var meal = getMealById(id);
          return { name: meal ? meal.name : id, qty: cart[id], price: PROMO_PRICE };
        }),
        total: (totalSelected * PROMO_PRICE).toFixed(2),
        customer: {
          name: document.getElementById("firstName").value + " " + document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value
        },
        deliveryDate: document.getElementById("deliveryDate").value,
        notes: document.getElementById("notes").value
      };

      console.log("ORDER PLACED (demo mode):", orderData);
    }, 1800);
  }

  // ─── DELIVERY DATE ─────────────────────────────────────────
  function setMinDeliveryDate() {
    var today = new Date();
    var daysUntilSunday = (7 - today.getDay()) % 7;
    if (daysUntilSunday < 3) daysUntilSunday += 7;
    var nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    var minDate = nextSunday.toISOString().split("T")[0];
    deliveryDateInput.setAttribute("min", minDate);
    deliveryDateInput.value = minDate;
  }

  // ─── TOAST ─────────────────────────────────────────────────
  function showToast(message) {
    var existing = document.querySelector(".toast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function () { toast.classList.add("show"); });
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.remove(); }, 300);
    }, 2800);
  }

  // ─── SCROLL ANIMATIONS ────────────────────────────────────
  function animateOnScroll() {
    var elements = document.querySelectorAll(".step, .testimonial-card, .trust-badge");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });
  }

  // ─── COUNTDOWN TIMER ──────────────────────────────────────
  function startCountdown() {
    var timerEl = document.getElementById("countdownTimer");
    if (!timerEl) return;

    var now = new Date();
    var deadline = new Date(now);
    deadline.setHours(23, 59, 59, 0);

    function tick() {
      var remaining = deadline - new Date();
      if (remaining <= 0) { timerEl.textContent = "00:00:00"; return; }
      var h = Math.floor(remaining / 3600000);
      var m = Math.floor((remaining % 3600000) / 60000);
      var s = Math.floor((remaining % 60000) / 1000);
      timerEl.textContent =
        (h < 10 ? "0" : "") + h + ":" +
        (m < 10 ? "0" : "") + m + ":" +
        (s < 10 ? "0" : "") + s;
      requestAnimationFrame(tick);
    }
    tick();
  }

  // ─── STICKY MOBILE CTA ───────────────────────────────────
  function updateStickyCta() {
    var stickyCount = document.getElementById("stickyCount");
    var stickyBtn = document.getElementById("stickyCtaBtn");
    if (!stickyCount || !stickyBtn) return;

    stickyCount.textContent = totalSelected;
    if (totalSelected >= REQUIRED_MEALS) {
      stickyBtn.textContent = "Checkout";
      stickyBtn.href = "#cart-section";
    } else {
      stickyBtn.textContent = "Select Meals";
      stickyBtn.href = "#meals";
    }
  }

  // ─── HELPERS ──────────────────────────────────────────────
  function getMealById(id) {
    for (var i = 0; i < MEALS.length; i++) {
      if (MEALS[i].id === id) return MEALS[i];
    }
    return null;
  }

  // ─── START ────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
