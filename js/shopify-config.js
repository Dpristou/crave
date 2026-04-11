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
  // Your Shopify store domain — customers land here after clicking checkout.
  // Use the custom domain (not .myshopify.com) so the URL looks clean.
  storeDomain: "cravemealprepco.com",

  // The discount code you created in Shopify Admin → Discounts.
  // Leave blank to send customers to checkout without a discount applied.
  discountCode: "PROMO10",

  // Promo price per meal (display only)
  promoPrice: 9.99,

  // Number of meals required (display only)
  requiredMeals: 10
};
