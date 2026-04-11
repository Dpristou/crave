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
