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

  // Default Satrter Ingredients
  const defaultIngredients = [
    new Ingredient("i1", "spaghetti noodles", "", "2028-01-01", "Pantry", 2),
    new Ingredient("i2", "tomato sauce", "", "2026-06-02", "Fridge", 1),
    new Ingredient("i3", "firm tofu", "", "2026-05-02", "Fridge", 1),
    new Ingredient("i4", "spinach (frozen)", "", "2027-01-16", "Pantry", 1),
    new Ingredient("i5", "rice (frozen)", "", "2029-01-01", "Pantry", 1),
    new Ingredient("i6", "peanut butter", "", "2027-01-01", "Fridge", 1),
    new Ingredient("i7", "apricot jam", "", "2026-11-01", "Fridge", 1),
    new Ingredient("i8", "almond milk", "", "2026-05-01", "Fridge", 1),
    new Ingredient("i9", "chocolate protein powder", "", "2028-05-01", "Pantry", 1),
    new Ingredient("i10", "banana", "", null, "Pantry", 4),
    new Ingredient("i11", "sandwich bread", "", null, "Pantry", 1),
  ];

  const inventory = defaultIngredients.slice(0, 8);
  const exampleWeeklyList = defaultIngredients.slice(9);

  const recipes = [
    new Recipe(
      "r1",
      "Tofu Bolognese",
      "",
      "Italian, Nut-Free",
      [inventory[0], inventory[1]]
    ),
    new Recipe(
      "r2",
      "Protein Shake",
      "",
      "High-Protein, Gluten-Free",
      [inventory[7], inventory[8], inventory[5]]
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
  ];

  // Store everything
  _set("defaultIngredients", defaultIngredients);
  _set("inventory", inventory);
  _set("recipes", recipes);
  _set("shoppingLists", shoppingLists);
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
  const recipes = getRecipes().map(r => r.id === id ? { ...r, ...changes } : r);
  saveRecipes(recipes);
}


function deleteRecipe(id) {
  saveRecipes(getRecipes().filter(r => r.id !== id));
}

function getRecipeById(id) {
  return getRecipes().find(r => r.id === id) || null;
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
  saveInventory(getInventory().filter(i => i.id != id));
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
  const lists = getShoppingLists().map(l => {
    if (l.id !== listId) return l;
    return { ...l, items: [...l.items, { name: String(itemName), checked: false }] };
  });
  saveShoppingLists(lists);
}

function getMissingIngredients(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];
  const inStock = new Set(getInventory().map(i => i.name.toLowerCase()));
  return recipe.ingredients
    .filter(ing => {
      const name = typeof ing === "object" ? ing.name : ing;
      return !inStock.has(name.toLowerCase());
    })
    .map(ing => typeof ing === "object" ? ing.name : String(ing));
}

function getAvailableRecipes() {
  const inStock = new Set(getInventory().map(i => i.name.toLowerCase()));
  return getRecipes().filter(r =>
    r.ingredients.every(ing => inStock.has(ing.toLowerCase()))
  );
}

function getExpiredItems() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return getInventory().filter(i => i.useBy && new Date(i.useBy) < today);
}