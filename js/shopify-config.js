/**
 * CRAVE Meal Prep Co. — Shopify Configuration
 *
 * HOW TO SET UP:
 * 1. In Shopify Admin → Settings → Apps and sales channels → Develop apps
 * 2. Click your app (e.g. "promo landing page")
 * 3. Go to "Configuration" tab → Storefront API access scopes
 *    - Enable: unauthenticated_read_product_listings
 *    - Enable: unauthenticated_write_checkouts
 *    - Enable: unauthenticated_read_checkouts
 * 4. Click "Install app" if not already installed
 * 5. Go to "API credentials" tab
 * 6. Copy the "Storefront API access token" and paste it below
 *
 * That's it! Once the token is set, the checkout button will
 * redirect customers to your real Shopify checkout page.
 * Orders will appear in your Shopify admin and payments go
 * directly to your bank account.
 */

var SHOPIFY_CONFIG = {
  // Your Shopify store domain (the .myshopify.com one)
  domain: "cravemealprepco.myshopify.com",

  // Storefront API access token — paste yours here
  // Get it from: Shopify Admin → Settings → Apps → Develop apps → your app → API credentials
  storefrontAccessToken: "",

  // Promo price per meal
  promoPrice: 9.99,

  // Number of meals required
  requiredMeals: 10,

  // Map meal IDs to Shopify product handles (these get looked up automatically)
  // If products aren't found by handle, the system falls back to searching by title
  productHandleMap: {
    "chicken-waffles": "chicken-waffles",
    "buffalo-chicken-quesadilla": "buffalo-chicken-quesadilla",
    "charred-peruvian-chicken": "charred-peruvian-chicken",
    "kfc-bowl": "kfc-bowl",
    "general-tsos-chicken-meatballs": "general-tsos-chicken-meatballs",
    "chipotle-chicken": "chipotle-chicken",
    "teriyaki-chicken-potstickers": "teriyaki-chicken-potstickers",
    "chimichurri-chicken": "chimichurri-chicken",
    "lemon-garlic-chicken": "lemon-garlic-chicken",
    "creamy-gochujang-beef-noodles": "creamy-gochujang-beef-noodles",
    "3-bean-beef-chili": "3-bean-beef-chili",
    "sweet-chili-beef": "sweet-chili-beef",
    "beef-and-broccoli": "beef-and-broccoli",
    "bacon-cheddar-burger": "bacon-cheddar-burger",
    "shepards-pie": "shepards-pie",
    "pepper-jack-turkey-burger": "pepper-jack-turkey-burger",
    "turkey-burger": "turkey-burger",
    "crave-breakfast-burrito": "crave-breakfast-burrito",
    "steak-and-eggs": "steak-and-eggs",
    "shrimp-scampi": "shrimp-scampi"
  }
};
