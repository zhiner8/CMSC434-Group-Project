class Ingredient {
  constructor(id, name, description, useBy, location, quantity) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.useBy = useBy;
    this.location = location;
    this.quantity = quantity;
  }
}

class Recipe {
  constructor(id, name, description, tags, ingredients) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.ingredients = ingredients;
  }
}

class ShoppingList {
  constructor(id, name, description, tags, date, ingredientList, isStarter) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.date = date; // date list was created
    this.ingredientList = ingredientList;
    this.isStarter = isStarter;
  }
}

// this is what Yosh had initially but I couldn't define the other storage arrays in here
// due to their initializations being based on previous list initializations

function _get(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

function _set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//Initializes the dstorage for the different pages. ()
function initStorage() {
  //If the field already exists, no need to initialize
  if (_get("defaultIngredients") !== null) return;

  // Default Starter Ingredients
  const defaultIngredients = [
    // current demo inventory
    new Ingredient(
      "i1",
      "spaghetti noodles",
      "Calories: 200, Protein: 7g, Carbs: 42g, Fat: 1g, Fiber: 2g",
      "2028-01-01",
      "Pantry",
      2
    ),
    new Ingredient(
      "i2",
      "tomato sauce",
      "Calories: 80, Protein: 2g, Carbs: 14g, Fat: 2g, Fiber: 3g",
      "2026-06-02",
      "Fridge",
      1
    ),
    new Ingredient(
      "i3",
      "firm tofu",
      "Calories: 90, Protein: 10g, Carbs: 2g, Fat: 5g, Fiber: 1g",
      "2026-05-02",
      "Fridge",
      1
    ),
    new Ingredient(
      "i4",
      "spinach (frozen)",
      "Calories: 30, Protein: 3g, Carbs: 4g, Fat: 0g, Fiber: 2g",
      "2027-01-16",
      "Pantry",
      1
    ),
    new Ingredient(
      "i5",
      "rice (frozen)",
      "Calories: 180, Protein: 4g, Carbs: 38g, Fat: 1g, Fiber: 1g",
      "2029-01-01",
      "Pantry",
      1
    ),
    new Ingredient(
      "i6",
      "peanut butter",
      "Calories: 190, Protein: 8g, Carbs: 7g, Fat: 16g, Fiber: 2g",
      "2027-01-01",
      "Fridge",
      1
    ),
    new Ingredient(
      "i7",
      "apricot jam",
      "Calories: 50, Protein: 0g, Carbs: 13g, Fat: 0g, Fiber: 1g",
      "2026-11-01",
      "Fridge",
      1
    ),
    new Ingredient(
      "i8",
      "almond milk",
      "Calories: 30, Protein: 1g, Carbs: 1g, Fat: 2.5g, Fiber: 0g",
      "2026-05-01",
      "Fridge",
      1
    ),

    // ingredient options not currently stocked but on 04-01 shopping list
    new Ingredient(
      "i9",
      "chocolate protein powder",
      "Calories: 120, Protein: 24g, Carbs: 3g, Fat: 1g, Fiber: 1g",
      "2028-05-01",
      "Pantry",
      1
    ),
    new Ingredient(
      "i10",
      "banana",
      "Calories: 105, Protein: 1g, Carbs: 27g, Fat: 0g, Fiber: 3g",
      "2026-04-02",
      "Pantry",
      4
    ),
    new Ingredient(
      "i11",
      "sandwich bread",
      "Calories: 80, Protein: 3g, Carbs: 15g, Fat: 1g, Fiber: 1g",
      "2026-04-03",
      "Pantry",
      1
    ),
    new Ingredient(
      "i12",
      "black beans",
      "Calories: 110, Protein: 7g, Carbs: 20g, Fat: 0.5g, Fiber: 6g",
      "2028-08-08",
      "Pantry",
      1
    ),
    new Ingredient(
      "i13",
      "vegetable broth",
      "Calories: 15, Protein: 1g, Carbs: 2g, Fat: 0g, Fiber: 0g",
      "2026-08-08",
      "Fridge",
      1
    ),
    new Ingredient(
      "i14",
      "bell pepper",
      "Calories: 25, Protein: 1g, Carbs: 6g, Fat: 0g, Fiber: 2g",
      "2026-04-21",
      "Fridge",
      1
    ),
    new Ingredient(
      "i15",
      "yellow onion",
      "Calories: 45, Protein: 1g, Carbs: 11g, Fat: 0g, Fiber: 2g",
      "2026-04-23",
      "Pantry",
      1
    ),

    // ingredient options not current stocked but on monthly-book-club shopping list
    new Ingredient(
      "i16",
      "pretzels",
      "Calories: 110, Protein: 2g, Carbs: 23g, Fat: 1g, Fiber: 1g",
      null,
      "Pantry",
      1
    ),
    new Ingredient(
      "i17",
      "black tea",
      "Calories: 0, Protein: 0g, Carbs: 0g, Fat: 0g, Fiber: 0g",
      null,
      "Pantry",
      1
    ),
    new Ingredient(
      "i18",
      "strawberries",
      "Calories: 50, Protein: 1g, Carbs: 12g, Fat: 0g, Fiber: 3g",
      null,
      "Pantry",
      1
    ),
  ];

  const inventory = defaultIngredients.slice(0, 8);
  const exampleWeeklyList = defaultIngredients.slice(8, 15);
  const monthlyList = defaultIngredients.slice(15);

  const recipes = [
    new Recipe("r1", "Tofu Bolognese", "", "Italian, Nut-Free", [
      inventory[0],
      inventory[1],
    ]),
    new Recipe("r2", "Protein Shake", "", "High-Protein, Gluten-Free", [
      inventory[7],
      defaultIngredients[8],
      inventory[5],
    ]),
    new Recipe(
      "r3",
      "Tofu Scramble",
      "Easy breakfast",
      "Gluten-Free, Nut-Free",
      [
        defaultIngredients[2],
        defaultIngredients[13],
        defaultIngredients[14],
        defaultIngredients[3],
      ]
    ),
  ];

  const shoppingLists = [
    new ShoppingList(
      "l1",
      "04-01 Shopping List",
      "",
      "weekly",
      "2026-04-01",
      exampleWeeklyList,
      false
    ),
    new ShoppingList(
      "l2",
      "Monthly Club Meeting",
      "",
      "Monthly",
      "2026-04-01",
      monthlyList,
      false
    ),
  ];

  // Store everything
  _set("defaultIngredients", defaultIngredients);
  _set("inventory", inventory);
  _set("recipes", recipes);
  _set("shoppingLists", shoppingLists);
  console.log(shoppingLists);
}

function getRecipes() {
  return _get("recipes") || [];
}

function saveRecipes(recipes) {
  _set("recipes", recipes);
}

function addRecipe(recipe) {
  const recipes = getRecipes();
  recipes.push(recipe);
  saveRecipes(recipes);
  return recipe;
}

function updateRecipe(id, changes) {
  const recipes = getRecipes().map((r) =>
    r.id === id ? { ...r, ...changes } : r
  );
  saveRecipes(recipes);
}

function deleteRecipe(id) {
  saveRecipes(getRecipes().filter((r) => r.id !== id));
}

function getRecipeById(id) {
  return getRecipes().find((r) => r.id === id) || null;
}

function getInventory() {
  return _get("inventory") || [];
}

function saveInventory(inventory) {
  _set("inventory", inventory);
}

function addInventoryItem(item) {
  const inventory = getInventory();
  inventory.push(item);
  saveInventory(inventory);
  return item;
}

function removeInventoryItem(id) {
  saveInventory(getInventory().filter((i) => i.id != id));
}

function getShoppingLists() {
  return _get("shoppingLists") || [];
}

function saveShoppingLists(lists) {
  _set("shoppingLists", lists);
}

function addShoppingList(shoppingList) {
  const lists = getShoppingLists();
  lists.push(shoppingList);
  saveShoppingLists(lists);
  return lists;
}

function addItemToShoppingList(listId, itemName) {
  const lists = getShoppingLists().map((l) => {
    if (l.id !== listId) return l;
    return {
      ...l,
      items: [...l.items, { name: String(itemName), checked: false }],
    };
  });
  saveShoppingLists(lists);
}

function getMissingIngredients(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];
  const inStock = new Set(getInventory().map((i) => i.name.toLowerCase()));
  return recipe.ingredients
    .filter((ing) => {
      if (ing !== null) {
        const name = typeof ing === "object" ? ing.name : ing;
        return !inStock.has(name.toLowerCase());
      }
    })
    .map((ing) =>
      typeof ing === "object"
        ? { name: ing.name, quantity: ing.quantity }
        : undefined
    );
}

function getAvailableRecipes() {
  const inStock = new Set(getInventory().map((i) => i.name.toLowerCase()));
  return getRecipes().filter((r) =>
    r.ingredients.every((ing) => {
      if (ing !== null) {
        return inStock.has(ing.name.toLowerCase());
      } else {
        return true;
      }
    })
  );
}

function getExpiredItems() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return getInventory().filter((i) => i.useBy && new Date(i.useBy) < today);
}
