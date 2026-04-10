/**
 * CRAVE Meal Prep Co. — Current Menu
 * All meals sourced from the existing cravemealprepco.com catalog.
 * Images use placeholder paths — replace with actual Shopify CDN URLs.
 */

const MEALS = [
  // ─── CHICKEN ──────────────────────────────────────────────
  {
    id: "grilled-chicken",
    name: "Grilled Chicken",
    category: "chicken",
    description: "Seasoned grilled chicken breast served with your choice of sides. High protein, clean and simple.",
    calories: 379,
    protein: 47,
    carbs: 28,
    fat: 8,
    tags: ["GF", "DF", "SF"],
    image: "images/grilled-chicken.jpg",
    popular: true
  },
  {
    id: "pulled-chicken",
    name: "Pulled Chicken",
    category: "chicken",
    description: "Tender slow-cooked pulled chicken with a savory house-made sauce. Comfort food that fits your macros.",
    calories: 410,
    protein: 42,
    carbs: 32,
    fat: 10,
    tags: ["GF", "DF", "SF"],
    image: "images/pulled-chicken.jpg",
    popular: false
  },
  {
    id: "cilantro-lime-chicken-tacos",
    name: "Cilantro Lime Chicken Tacos",
    category: "chicken",
    description: "Zesty cilantro lime chicken in soft tortillas with fresh pico de gallo and a squeeze of lime.",
    calories: 490,
    protein: 34,
    carbs: 45,
    fat: 16,
    tags: ["GF"],
    image: "images/cilantro-lime-tacos.jpg",
    popular: true
  },
  {
    id: "chipotle-chicken",
    name: "Chipotle Chicken",
    category: "chicken",
    description: "Smoky chipotle chicken thighs over cilantro lime rice with sauteed peppers, onions, and bold house-made chipotle mayo.",
    calories: 465,
    protein: 38,
    carbs: 40,
    fat: 14,
    tags: ["GF"],
    image: "images/chipotle-chicken.jpg",
    popular: false
  },
  {
    id: "chimichurri-chicken",
    name: "Chimichurri Chicken",
    category: "chicken",
    description: "Herb-marinated grilled chicken topped with vibrant house-made chimichurri. Bright, fresh, and packed with flavor.",
    calories: 395,
    protein: 44,
    carbs: 26,
    fat: 12,
    tags: ["GF", "DF"],
    image: "images/chimichurri-chicken.jpg",
    popular: false
  },
  {
    id: "lemon-garlic-chicken",
    name: "Lemon Garlic Chicken",
    category: "chicken",
    description: "Juicy chicken breast in a bright lemon garlic sauce. Light, clean, and perfect for any goal.",
    calories: 370,
    protein: 45,
    carbs: 24,
    fat: 9,
    tags: ["GF", "DF"],
    image: "images/lemon-garlic-chicken.jpg",
    popular: true
  },

  // ─── TURKEY ───────────────────────────────────────────────
  {
    id: "turkey-burger",
    name: "Turkey Burger",
    category: "turkey",
    description: "Classic seasoned turkey burger patty with your choice of sides. Lean, clean protein.",
    calories: 421,
    protein: 37,
    carbs: 30,
    fat: 14,
    tags: ["GF", "DF", "SF"],
    image: "images/turkey-burger.jpg",
    popular: true
  },
  {
    id: "toasted-sesame-turkey",
    name: "Toasted Sesame Turkey",
    category: "turkey",
    description: "Savory ground turkey in a toasted sesame glaze with crisp vegetables and steamed rice.",
    calories: 480,
    protein: 44,
    carbs: 46,
    fat: 14,
    tags: [],
    image: "images/sesame-turkey.jpg",
    popular: true
  },
  {
    id: "honey-mustard-turkey-burger",
    name: "Honey Mustard Turkey Burger",
    category: "turkey",
    description: "Turkey burger glazed with tangy honey mustard, served with roasted sweet potatoes.",
    calories: 413,
    protein: 38,
    carbs: 30,
    fat: 13,
    tags: ["GF"],
    image: "images/honey-mustard-turkey.jpg",
    popular: false
  },
  {
    id: "sweet-chili-turkey",
    name: "Sweet Chili Turkey",
    category: "turkey",
    description: "Ground turkey tossed in a sweet chili glaze with jasmine rice and fresh veggies. Bold and balanced.",
    calories: 404,
    protein: 32,
    carbs: 42,
    fat: 12,
    tags: ["GF"],
    image: "images/sweet-chili-turkey.jpg",
    popular: false
  },
  {
    id: "pepper-jack-turkey-burger",
    name: "Pepper Jack Turkey Burger",
    category: "turkey",
    description: "Spicy pepper jack-stuffed turkey burger with a kick. Served with seasoned sides.",
    calories: 440,
    protein: 39,
    carbs: 28,
    fat: 16,
    tags: [],
    image: "images/pepper-jack-turkey.jpg",
    popular: false
  },
  {
    id: "lean-mean-turkey",
    name: "Lean & Mean Turkey",
    category: "turkey",
    description: "Extra-lean seasoned ground turkey with steamed broccoli and brown rice. Simple, effective, no shortcuts.",
    calories: 385,
    protein: 42,
    carbs: 34,
    fat: 8,
    tags: ["GF", "DF"],
    image: "images/lean-mean-turkey.jpg",
    popular: false
  },

  // ─── BEEF ─────────────────────────────────────────────────
  {
    id: "beef-and-broccoli",
    name: "Beef & Broccoli",
    category: "beef",
    description: "Tender sliced beef and fresh broccoli in a savory house-made stir-fry sauce over jasmine rice.",
    calories: 450,
    protein: 40,
    carbs: 38,
    fat: 14,
    tags: ["GF", "DF", "SF"],
    image: "images/beef-broccoli.jpg",
    popular: true
  },
  {
    id: "udon-beef-stir-fry",
    name: "Udon Beef Stir Fry",
    category: "beef",
    description: "Sliced beef with thick udon noodles, fresh vegetables, and a rich savory sauce.",
    calories: 452,
    protein: 36,
    carbs: 50,
    fat: 12,
    tags: [],
    image: "images/udon-beef.jpg",
    popular: true
  },
  {
    id: "philly-cheesesteak-bowl",
    name: "Philly Cheesesteak Bowl",
    category: "beef",
    description: "Tender shaved beef with roasted red potatoes, peppers, onions, and melted provolone. A Crave best seller.",
    calories: 485,
    protein: 42,
    carbs: 36,
    fat: 18,
    tags: [],
    image: "images/philly-cheesesteak.jpg",
    popular: true
  },
  {
    id: "sweet-chili-beef",
    name: "Sweet Chili Beef",
    category: "beef",
    description: "Marinated beef strips in a sweet chili glaze with stir-fried vegetables and steamed rice.",
    calories: 460,
    protein: 38,
    carbs: 44,
    fat: 14,
    tags: ["GF"],
    image: "images/sweet-chili-beef.jpg",
    popular: false
  },

  // ─── BREAKFAST ────────────────────────────────────────────
  {
    id: "steak-and-eggs",
    name: "Steak & Eggs",
    category: "breakfast",
    description: "Grilled steak with fluffy scrambled eggs and seasoned potatoes. The ultimate high-protein breakfast.",
    calories: 386,
    protein: 35,
    carbs: 22,
    fat: 16,
    tags: ["GF", "DF", "SF"],
    image: "images/steak-eggs.jpg",
    popular: true
  },
  {
    id: "crave-breakfast-burrito",
    name: "Crave Breakfast Burrito",
    category: "breakfast",
    description: "A loaded flour tortilla packed with scrambled eggs, seasoned meat, cheese, peppers, and house-made salsa.",
    calories: 520,
    protein: 32,
    carbs: 48,
    fat: 22,
    tags: [],
    image: "images/breakfast-burrito.jpg",
    popular: true
  },
  {
    id: "protein-pancakes",
    name: "Red Velvet Protein Pancakes",
    category: "breakfast",
    description: "Fluffy red velvet protein pancakes with a sweet cream drizzle. Dessert for breakfast that fits your macros.",
    calories: 416,
    protein: 37,
    carbs: 48,
    fat: 8,
    tags: [],
    image: "images/protein-pancakes.jpg",
    popular: false
  },
  {
    id: "frittata-croissant",
    name: "Frittata Croissant Sandwich",
    category: "breakfast",
    description: "Egg frittata with cheese and veggies on a buttery croissant. Indulgent but balanced.",
    calories: 642,
    protein: 28,
    carbs: 65,
    fat: 30,
    tags: [],
    image: "images/frittata-croissant.jpg",
    popular: false
  },

  // ─── PREMIUM ──────────────────────────────────────────────
  {
    id: "shrimp-scampi",
    name: "Shrimp Scampi",
    category: "premium",
    description: "Grilled shrimp in a garlic white wine sauce with red chili flakes and parsley over angel hair pasta, finished with parmesan and lemon.",
    calories: 420,
    protein: 34,
    carbs: 42,
    fat: 12,
    tags: [],
    image: "images/shrimp-scampi.jpg",
    popular: true
  },
  {
    id: "bbq-pulled-pork-mac",
    name: "BBQ Pulled Pork Mac",
    category: "premium",
    description: "Slow-smoked pulled pork over creamy mac and cheese with tangy BBQ sauce. Pure comfort.",
    calories: 540,
    protein: 36,
    carbs: 52,
    fat: 20,
    tags: [],
    image: "images/bbq-pork-mac.jpg",
    popular: true
  },
  {
    id: "garlic-grilled-shrimp",
    name: "Garlic Grilled Shrimp",
    category: "premium",
    description: "Jumbo shrimp marinated in garlic herb butter, grilled to perfection and served with seasonal vegetables.",
    calories: 340,
    protein: 38,
    carbs: 18,
    fat: 12,
    tags: ["GF", "DF"],
    image: "images/garlic-shrimp.jpg",
    popular: false
  },
  {
    id: "mozzarella-spinach-ravioli",
    name: "Mozzarella & Spinach Ravioli",
    category: "premium",
    description: "Delicate pasta pockets filled with creamy mozzarella and tender spinach, cooked until perfectly al dente.",
    calories: 435,
    protein: 18,
    carbs: 56,
    fat: 15,
    tags: [],
    image: "images/spinach-ravioli.jpg",
    popular: false
  }
];
