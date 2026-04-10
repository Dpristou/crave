/**
 * CRAVE Meal Prep Co. — Current Weekly Menu
 * All meals from the active cravemealprepco.com menu.
 */

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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: true
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
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
    isNew: false
  }
];
