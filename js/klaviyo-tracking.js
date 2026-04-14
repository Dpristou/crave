/**
 * CRAVE Meal Prep Co. — Klaviyo Event Tracking
 *
 * Provides methods for identifying visitors and tracking e-commerce
 * events on the promo landing page. Uses Klaviyo's _learnq queue
 * so calls work even before the Klaviyo SDK fully loads.
 *
 * Usage (called from app.js):
 *   CraveKlaviyo.trackPageView();
 *   CraveKlaviyo.trackAddToCart(meal, qty);
 *   CraveKlaviyo.trackStartedCheckout(cart, total);
 *   CraveKlaviyo.identify(email, firstName, lastName, phone);
 *   CraveKlaviyo.subscribe(email);
 */

var CraveKlaviyo = (function () {
  "use strict";

  // Klaviyo's client-side event queue — works before the SDK loads
  window._learnq = window._learnq || [];

  function isConfigured() {
    return !!(
      typeof KLAVIYO_CONFIG !== "undefined" &&
      KLAVIYO_CONFIG.publicApiKey &&
      KLAVIYO_CONFIG.publicApiKey !== "YOUR_KLAVIYO_PUBLIC_API_KEY"
    );
  }

  // ─── IDENTIFY ──────────────────────────────────────────────
  // Call when a visitor provides their email (checkout form, signup)
  function identify(email, firstName, lastName, phone) {
    if (!isConfigured()) return;
    var profile = { "$email": email };
    if (firstName) profile["$first_name"] = firstName;
    if (lastName) profile["$last_name"] = lastName;
    if (phone) profile["$phone_number"] = phone;
    _learnq.push(["identify", profile]);
  }

  // ─── TRACK EVENT ───────────────────────────────────────────
  function track(eventName, properties) {
    if (!isConfigured()) return;
    _learnq.push(["track", eventName, properties || {}]);
  }

  // ─── PAGE VIEW ─────────────────────────────────────────────
  function trackPageView() {
    track("Viewed Promo Page", {
      "Page": "10 Meals for $9.99",
      "URL": window.location.href
    });
  }

  // ─── ADD TO CART ───────────────────────────────────────────
  function trackAddToCart(meal, qty) {
    if (!meal) return;
    track("Added to Cart", {
      "ProductName": meal.name,
      "ProductID": meal.id,
      "Category": meal.category,
      "Quantity": qty,
      "Price": 9.99,
      "Calories": meal.calories,
      "Protein": meal.protein
    });
  }

  // ─── STARTED CHECKOUT ─────────────────────────────────────
  function trackStartedCheckout(cartItems, totalPrice) {
    track("Started Checkout", {
      "Items": cartItems,
      "ItemCount": cartItems.length,
      "TotalPrice": totalPrice,
      "PromoCode": "PROMO10"
    });
  }

  // ─── SUBSCRIBE TO LIST ────────────────────────────────────
  // Uses Klaviyo's Client API to subscribe an email to a list.
  // Requires KLAVIYO_CONFIG.listId to be set.
  function subscribe(email, source) {
    if (!isConfigured()) return Promise.reject("Klaviyo not configured");
    if (!KLAVIYO_CONFIG.listId) return Promise.reject("No listId configured");

    var url = "https://a.klaviyo.com/client/subscriptions/?company_id=" + KLAVIYO_CONFIG.publicApiKey;

    var body = {
      data: {
        type: "subscription",
        attributes: {
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: email
              }
            }
          },
          custom_source: source || "Promo Landing Page"
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: KLAVIYO_CONFIG.listId
            }
          }
        }
      }
    };

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "revision": "2024-10-15"
      },
      body: JSON.stringify(body)
    });
  }

  return {
    isConfigured: isConfigured,
    identify: identify,
    track: track,
    trackPageView: trackPageView,
    trackAddToCart: trackAddToCart,
    trackStartedCheckout: trackStartedCheckout,
    subscribe: subscribe
  };
})();
