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
    bindKlaviyoSignup();
    setMinDeliveryDate();
    animateOnScroll();
    startCountdown();
    initShopify();
    initKlaviyo();
  }

  // ─── SHOPIFY INIT ──────────────────────────────────────────
  function initShopify() {
    if (typeof ShopifyCheckout !== "undefined" && ShopifyCheckout.isConfigured()) {
      shopifyReady = true;
      console.log("[CRAVE] Shopify checkout ready — cart permalink mode");
    }
  }

  // ─── KLAVIYO INIT ──────────────────────────────────────────
  function initKlaviyo() {
    if (typeof CraveKlaviyo !== "undefined" && CraveKlaviyo.isConfigured()) {
      CraveKlaviyo.trackPageView();
      console.log("[CRAVE] Klaviyo tracking active");
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
    if (meal) {
      showToast(meal.name + " added!");
      if (typeof CraveKlaviyo !== "undefined") {
        CraveKlaviyo.trackAddToCart(meal, cart[mealId]);
      }
    }

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
    cartCountEl.textContent = totalSelected;
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
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", function () {
        mobileNav.classList.toggle("open");
      });
    }

    var mobileLinks = mobileNav.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
      });
    });

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

    // Track checkout start in Klaviyo
    trackCheckoutInKlaviyo();

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

      // Identify visitor and track order in Klaviyo
      if (typeof CraveKlaviyo !== "undefined") {
        CraveKlaviyo.identify(
          orderData.customer.email,
          document.getElementById("firstName").value,
          document.getElementById("lastName").value,
          orderData.customer.phone
        );
        CraveKlaviyo.track("Placed Order", {
          "OrderId": orderData.orderId,
          "Items": orderData.meals,
          "TotalPrice": orderData.total
        });
      }

      console.log("ORDER PLACED (demo mode):", orderData);
    }, 1800);
  }

  // ─── KLAVIYO CHECKOUT TRACKING ────────────────────────────
  function trackCheckoutInKlaviyo() {
    if (typeof CraveKlaviyo === "undefined") return;
    var items = Object.keys(cart).map(function (id) {
      var meal = getMealById(id);
      return {
        ProductName: meal ? meal.name : id,
        ProductID: id,
        Quantity: cart[id],
        Price: PROMO_PRICE
      };
    });
    CraveKlaviyo.trackStartedCheckout(items, (totalSelected * PROMO_PRICE).toFixed(2));
  }

  // ─── KLAVIYO EMAIL SIGNUP ─────────────────────────────────
  function bindKlaviyoSignup() {
    var form = document.getElementById("klaviyoSignupForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailInput = document.getElementById("signupEmail");
      var noteEl = document.getElementById("signupNote");
      var btn = document.getElementById("signupBtn");
      var email = emailInput.value.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        noteEl.textContent = "Please enter a valid email address.";
        noteEl.className = "signup-note signup-error";
        return;
      }

      btn.disabled = true;
      btn.textContent = "Signing up...";

      // Identify the visitor in Klaviyo
      if (typeof CraveKlaviyo !== "undefined") {
        CraveKlaviyo.identify(email);
        CraveKlaviyo.track("Subscribed to Promo List", { "Source": "Promo Landing Page" });
      }

      // Subscribe to list via Klaviyo Client API
      if (typeof CraveKlaviyo !== "undefined" && CraveKlaviyo.isConfigured() && KLAVIYO_CONFIG.listId) {
        CraveKlaviyo.subscribe(email).then(function () {
          showSignupSuccess(emailInput, noteEl, btn);
        }).catch(function () {
          // Even if the API call fails, the identify call above still works
          showSignupSuccess(emailInput, noteEl, btn);
        });
      } else {
        showSignupSuccess(emailInput, noteEl, btn);
      }
    });
  }

  function showSignupSuccess(emailInput, noteEl, btn) {
    emailInput.value = "";
    emailInput.disabled = true;
    btn.textContent = "Signed Up!";
    noteEl.textContent = "You're on the list! Watch your inbox for exclusive deals.";
    noteEl.className = "signup-note signup-success";
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
