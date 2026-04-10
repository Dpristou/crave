/**
 * CRAVE Meal Prep Co. — Promo Landing Page
 * 10 Meals for $9.99 Each — Full Meal Selection & Checkout
 */

(function () {
  "use strict";

  const PROMO_PRICE = 9.99;
  const REQUIRED_MEALS = 10;

  // ─── STATE ──────────────────────────────────────────────────
  // cart maps meal id -> quantity
  const cart = {};
  let totalSelected = 0;

  // ─── CATEGORY ICON MAP ─────────────────────────────────────
  const categoryIcons = {
    chicken: "🍗",
    turkey: "🍗",
    beef: "🥩",
    breakfast: "🍳",
    premium: "🍝"
  };

  // ─── DOM REFS ───────────────────────────────────────────────
  const mealsGrid = document.getElementById("mealsGrid");
  const selectedCountEl = document.getElementById("selectedCount");
  const progressFill = document.getElementById("progressFill");
  const reviewOrderBtn = document.getElementById("reviewOrderBtn");
  const cartCountEl = document.getElementById("cart-count");
  const mobileCartCount = document.querySelector(".mobile-cart-count");
  const cartItemsEl = document.getElementById("cartItems");
  const cartEmptyEl = document.getElementById("cartEmpty");
  const summaryCountEl = document.getElementById("summaryCount");
  const summaryTotalEl = document.getElementById("summaryTotal");
  const summaryNoteEl = document.getElementById("summaryNote");
  const remainingCountEl = document.getElementById("remainingCount");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const confirmationModal = document.getElementById("confirmationModal");
  const modalClose = document.getElementById("modalClose");
  const checkoutForm = document.getElementById("checkoutForm");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const orderIdEl = document.getElementById("orderId");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.getElementById("mobileNav");
  const deliveryDateInput = document.getElementById("deliveryDate");

  // ─── INIT ───────────────────────────────────────────────────
  function init() {
    renderMeals(MEALS);
    bindCategoryFilters();
    bindHeaderEvents();
    bindCheckoutEvents();
    setMinDeliveryDate();
    addStickyBarScrollEffect();
    animateOnScroll();
    startCountdown();
    animateClaimedCount();
  }

  // ─── RENDER MEALS ───────────────────────────────────────────
  function renderMeals(meals) {
    mealsGrid.innerHTML = "";
    meals.forEach(function (meal) {
      var qty = cart[meal.id] || 0;
      var icon = categoryIcons[meal.category] || "🍲";

      var tagsHtml = "";
      if (meal.tags && meal.tags.length > 0) {
        meal.tags.forEach(function (tag) {
          tagsHtml += '<span class="meal-tag">' + tag + "</span>";
        });
      }

      // Estimate original prices per category for crossed-out price
      var origPrices = {
        chicken: 14.95, turkey: 14.95, beef: 14.95,
        breakfast: 14.95, premium: 18.49
      };
      var origPrice = origPrices[meal.category] || 14.95;

      var controlHtml;
      if (qty > 0) {
        controlHtml =
          '<div class="meal-qty-control">' +
            '<button class="qty-btn" data-action="decrement" data-id="' + meal.id + '">-</button>' +
            '<span class="qty-display">' + qty + '</span>' +
            '<button class="qty-btn" data-action="increment" data-id="' + meal.id + '"' +
              (totalSelected >= REQUIRED_MEALS ? " disabled" : "") + '>+</button>' +
          '</div>';
      } else {
        controlHtml =
          '<button class="add-meal-btn" data-id="' + meal.id + '"' +
            (totalSelected >= REQUIRED_MEALS ? " disabled" : "") +
          '>+ Add</button>';
      }

      var card = document.createElement("div");
      card.className = "meal-card" + (qty > 0 ? " selected" : "");
      card.setAttribute("data-category", meal.category);
      card.innerHTML =
        '<div class="meal-card-image">' +
          '<span class="meal-icon">' + icon + '</span>' +
          '<span class="category-badge">' + meal.category + '</span>' +
          (meal.popular ? '<span class="popular-badge">Popular</span>' : '') +
        '</div>' +
        '<div class="meal-card-body">' +
          '<h3>' + meal.name + '</h3>' +
          (tagsHtml ? '<div class="meal-tags">' + tagsHtml + '</div>' : '') +
          '<p>' + meal.description + '</p>' +
          '<div class="meal-macros">' +
            '<span class="macro"><strong>' + meal.calories + '</strong> cal</span>' +
            '<span class="macro"><strong>' + meal.protein + 'g</strong> protein</span>' +
            '<span class="macro"><strong>' + meal.carbs + 'g</strong> carbs</span>' +
            '<span class="macro"><strong>' + meal.fat + 'g</strong> fat</span>' +
          '</div>' +
          '<div class="meal-card-footer">' +
            '<div class="meal-price">' +
              '$' + PROMO_PRICE.toFixed(2) +
              '<span class="original-price">$' + origPrice.toFixed(2) + '</span>' +
            '</div>' +
            controlHtml +
          '</div>' +
        '</div>';

      mealsGrid.appendChild(card);
    });

    bindMealCardEvents();
  }

  // ─── MEAL CARD EVENTS ──────────────────────────────────────
  function bindMealCardEvents() {
    // Add buttons
    var addBtns = mealsGrid.querySelectorAll(".add-meal-btn");
    addBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        addToCart(id);
      });
    });

    // Qty buttons
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
    if (cart[mealId] <= 0) {
      delete cart[mealId];
    }
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
    // Selection bar
    selectedCountEl.textContent = totalSelected;
    var pct = (totalSelected / REQUIRED_MEALS) * 100;
    progressFill.style.width = pct + "%";
    if (totalSelected >= REQUIRED_MEALS) {
      progressFill.classList.add("complete");
    } else {
      progressFill.classList.remove("complete");
    }

    // Review button
    reviewOrderBtn.disabled = totalSelected < REQUIRED_MEALS;

    // Header cart count
    cartCountEl.textContent = totalSelected;
    if (mobileCartCount) mobileCartCount.textContent = totalSelected;

    // Re-render meal cards with current filter
    var activeFilter = document.querySelector(".filter-btn.active");
    var category = activeFilter ? activeFilter.getAttribute("data-category") : "all";
    var filteredMeals = category === "all" ? MEALS : MEALS.filter(function (m) { return m.category === category; });
    renderMeals(filteredMeals);

    // Render cart items
    renderCart();

    // Summary
    summaryCountEl.textContent = totalSelected + " / " + REQUIRED_MEALS;
    var totalPrice = totalSelected * PROMO_PRICE;
    summaryTotalEl.textContent = "$" + totalPrice.toFixed(2);

    var remaining = REQUIRED_MEALS - totalSelected;
    if (remaining > 0) {
      remainingCountEl.textContent = remaining;
      summaryNoteEl.innerHTML = "Select <strong>" + remaining + "</strong> more meal" + (remaining !== 1 ? "s" : "") + " to complete your order.";
      summaryNoteEl.className = "summary-note";
    } else {
      summaryNoteEl.textContent = "Your order is complete! Proceed to checkout.";
      summaryNoteEl.className = "summary-note ready";
    }

    checkoutBtn.disabled = totalSelected < REQUIRED_MEALS;

    // Update sticky mobile CTA
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
    // Remove all children except cartEmpty
    var items = cartItemsEl.querySelectorAll(".cart-item");
    items.forEach(function (item) { item.remove(); });

    keys.forEach(function (id) {
      var meal = getMealById(id);
      if (!meal) return;
      var qty = cart[id];
      var icon = categoryIcons[meal.category] || "🍲";
      var lineTotal = (qty * PROMO_PRICE).toFixed(2);

      var el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML =
        '<div class="cart-item-image">' + icon + '</div>' +
        '<div class="cart-item-info">' +
          '<h4>' + meal.name + '</h4>' +
          '<span>' + meal.calories + ' cal | ' + meal.protein + 'g protein</span>' +
        '</div>' +
        '<div class="cart-item-qty">' +
          '<button class="cart-qty-btn" data-action="cart-dec" data-id="' + id + '">-</button>' +
          '<span class="cart-qty-display">' + qty + '</span>' +
          '<button class="cart-qty-btn" data-action="cart-inc" data-id="' + id + '"' +
            (totalSelected >= REQUIRED_MEALS ? " disabled" : "") +
          '>+</button>' +
        '</div>' +
        '<span class="cart-item-price">$' + lineTotal + '</span>' +
        '<button class="cart-item-remove" data-id="' + id + '" title="Remove">&times;</button>';

      cartItemsEl.appendChild(el);
    });

    // Bind cart item events
    bindCartItemEvents();
  }

  function bindCartItemEvents() {
    var btns = cartItemsEl.querySelectorAll(".cart-qty-btn");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var action = btn.getAttribute("data-action");
        if (action === "cart-inc") {
          addToCart(id);
        } else {
          removeFromCart(id);
        }
      });
    });

    var removeBtns = cartItemsEl.querySelectorAll(".cart-item-remove");
    removeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        removeAllOfMeal(id);
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
    // Mobile menu toggle
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", function () {
        mobileNav.classList.toggle("open");
      });
    }

    // Close mobile menu on link click
    var mobileLinks = mobileNav.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
      });
    });

    // Review order button scrolls to cart
    reviewOrderBtn.addEventListener("click", function () {
      document.getElementById("cart-section").scrollIntoView({ behavior: "smooth" });
    });
  }

  // ─── CHECKOUT EVENTS ───────────────────────────────────────
  function bindCheckoutEvents() {
    // Open checkout modal
    checkoutBtn.addEventListener("click", function () {
      if (totalSelected < REQUIRED_MEALS) return;
      checkoutModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    // Close modal
    modalClose.addEventListener("click", closeCheckoutModal);
    checkoutModal.addEventListener("click", function (e) {
      if (e.target === checkoutModal) closeCheckoutModal();
    });

    // Card number formatting
    var cardInput = document.getElementById("cardNumber");
    cardInput.addEventListener("input", function () {
      var val = cardInput.value.replace(/\D/g, "").substring(0, 16);
      var formatted = val.replace(/(\d{4})(?=\d)/g, "$1 ");
      cardInput.value = formatted;
    });

    // Expiry formatting
    var expiryInput = document.getElementById("cardExpiry");
    expiryInput.addEventListener("input", function () {
      var val = expiryInput.value.replace(/\D/g, "").substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + "/" + val.substring(2);
      }
      expiryInput.value = val;
    });

    // CVC - numbers only
    var cvcInput = document.getElementById("cardCvc");
    cvcInput.addEventListener("input", function () {
      cvcInput.value = cvcInput.value.replace(/\D/g, "").substring(0, 4);
    });

    // Form submit
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleCheckout();
    });
  }

  function closeCheckoutModal() {
    checkoutModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // ─── HANDLE CHECKOUT ───────────────────────────────────────
  function handleCheckout() {
    // Validate form
    var fields = checkoutForm.querySelectorAll("[required]");
    var valid = true;

    fields.forEach(function (field) {
      field.classList.remove("error");
      if (!field.value.trim()) {
        field.classList.add("error");
        valid = false;
      }
    });

    // Email validation
    var emailField = document.getElementById("email");
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailPattern.test(emailField.value)) {
      emailField.classList.add("error");
      valid = false;
    }

    // Card number validation (basic)
    var cardField = document.getElementById("cardNumber");
    var cardDigits = cardField.value.replace(/\D/g, "");
    if (cardDigits.length < 15) {
      cardField.classList.add("error");
      valid = false;
    }

    if (!valid) {
      showToast("Please fill in all required fields.");
      // Scroll to first error
      var firstError = checkoutForm.querySelector(".error");
      if (firstError) firstError.focus();
      return;
    }

    // Simulate order processing
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = "Processing...";

    setTimeout(function () {
      // Generate order ID
      var oid = "CRV-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
      orderIdEl.textContent = oid;

      // Close checkout, show confirmation
      closeCheckoutModal();
      confirmationModal.classList.add("open");
      document.body.style.overflow = "hidden";

      // Reset button
      placeOrderBtn.disabled = false;
      placeOrderBtn.textContent = "Place Order \u2014 $99.90";

      // Log the order (in production, this would POST to your backend)
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
          phone: document.getElementById("phone").value,
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          state: document.getElementById("state").value,
          zip: document.getElementById("zip").value
        },
        deliveryDate: document.getElementById("deliveryDate").value,
        notes: document.getElementById("notes").value
      };

      console.log("ORDER PLACED:", orderData);
    }, 1800);
  }

  // ─── DELIVERY DATE ─────────────────────────────────────────
  function setMinDeliveryDate() {
    // Next available Sunday (meals prep on Sundays)
    var today = new Date();
    var daysUntilSunday = (7 - today.getDay()) % 7;
    if (daysUntilSunday < 3) daysUntilSunday += 7; // Need at least 3 days lead time
    var nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    var minDate = nextSunday.toISOString().split("T")[0];
    deliveryDateInput.setAttribute("min", minDate);
    deliveryDateInput.value = minDate;
  }

  // ─── TOAST NOTIFICATIONS ───────────────────────────────────
  function showToast(message) {
    // Remove existing toast
    var existing = document.querySelector(".toast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(function () {
      toast.classList.add("show");
    });

    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.remove(); }, 300);
    }, 2800);
  }

  // ─── SCROLL EFFECTS ────────────────────────────────────────
  function addStickyBarScrollEffect() {
    var selectionBar = document.getElementById("selectionBar");
    if (!selectionBar) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            selectionBar.style.borderRadius = "0";
          } else {
            selectionBar.style.borderRadius = "var(--radius-md)";
          }
        });
      },
      { threshold: 0, rootMargin: "-68px 0px 0px 0px" }
    );

    observer.observe(document.querySelector(".meals-section"));
  }

  function animateOnScroll() {
    var cards = document.querySelectorAll(".step, .meal-card");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach(function (card) {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity .5s ease, transform .5s ease";
      observer.observe(card);
    });
  }

  // ─── COUNTDOWN TIMER ────────────────────────────────────────
  function startCountdown() {
    var timerEl = document.getElementById("countdownTimer");
    if (!timerEl) return;

    // Set deadline to end of today (midnight)
    var now = new Date();
    var deadline = new Date(now);
    deadline.setHours(23, 59, 59, 0);

    function tick() {
      var remaining = deadline - new Date();
      if (remaining <= 0) {
        timerEl.textContent = "00:00:00";
        return;
      }
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

  // ─── SOCIAL PROOF COUNTER ─────────────────────────────────
  function animateClaimedCount() {
    var el = document.getElementById("claimedCount");
    if (!el) return;

    // Slowly increment to simulate real-time claims
    var base = 147;
    setInterval(function () {
      if (Math.random() > 0.6) {
        base += 1;
        el.textContent = base;
      }
    }, 30000);
  }

  // ─── STICKY MOBILE CTA ────────────────────────────────────
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

  // ─── HELPERS ────────────────────────────────────────────────
  function getMealById(id) {
    for (var i = 0; i < MEALS.length; i++) {
      if (MEALS[i].id === id) return MEALS[i];
    }
    return null;
  }

  // ─── START ──────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
