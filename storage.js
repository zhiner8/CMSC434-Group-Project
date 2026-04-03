class Ingredient {
  constructor(name, description, useBy, location, quantity) {
    this.name = name;
    this.description = description;
    this.useBy = useBy;
    this.location = location;
    this.quantity = quantity;
  }
}

class Recipe {
  constructor(name, description, tags, ingredients) {
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.ingredients = ingredients;
  }
}

class ShoppingList {
  constructor(name, description, tags, date, list) {
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.date = date; // date list was created
    this.list = list;
  }
}


// this is what Yosh had initially but I couldn't define the other storage arrays in here
// due to their initializations being based on previous list initializations
const DEFAULTS = {
  ingredientMemory: [
    // ingredients in our demo kitchen
    new Ingredient("spaghetti noodles", "", new Date("2028-01-01"), "Pantry", 2),
    new Ingredient("tomato sauce", "", new Date("2026-06-02"), "Fridge", 1),
    new Ingredient("firm tofu", "", new Date("2026-05-02"), "Fridge", 1),
    new Ingredient("spinach (frozen)", "", new Date("2027-01-16"), "Pantry", 1),
    new Ingredient("rice (frozen)", "", new Date("2029-01-01"), "Pantry", 1),
    new Ingredient("peanut butter", "", new Date("2027-01-01"), "Fridge", 1),
    new Ingredient("apricot jam", "", new Date("2026-11-01"), "Fridge", 1),
    new Ingredient("almond milk", "", new Date("2026-05-01"), "Fridge", 1),
    new Ingredient("chocolate protein powder", "", new Date("2028-05-01"), "Pantry", 1),
    // ingredients in our demo shopping list
    new Ingredient("banana", "", null, "Pantry", 4),
    new Ingredient("sandwich bread", "", null, "Pantry", 1),
  ]
};

function _get(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

function _set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function initStorage() {

  console.log("okay");
  // Do we actually need this DEFAULTS dictionary?
  for (const [key, value] of Object.entries(DEFAULTS)) {
    if (_get(key) === null) _set(key, value);
  }

  DEFAULTS["inventory"] = DEFAULTS["ingredientMemory"].slice(0,8);
  DEFAULTS["exampleWeeklyList"] = DEFAULTS["ingredientMemory"].slice(9,-1);
  DEFAULTS["recipes"] =  [
    new Recipe(
      "Tofu Bolognese", "", "Italian, Nut-Free", new Array(DEFAULTS["inventory"][0], DEFAULTS["inventory"][1])),
    new Recipe("Protein Shake","","High-Protein, Gluten-Free", new Array(DEFAULTS["inventory"][7], DEFAULTS["inventory"][8], DEFAULTS["inventory"][5])
      ),
  ];
  DEFAULTS["shoppingLists"] = [
     new ShoppingList("04-01 Shopping List", "", "weekly", new Date("2026-04-01"), [DEFAULTS["exampleWeeklyList"]])
  ];
 // It stops working if this isn't repeated twice :((( not sure why rn
  for (const [key, value] of Object.entries(DEFAULTS)) {
    if (_get(key) === null) _set(key, value);
  }

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
  saveInventory(getInventory().filter(i => i.id !== id));
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
  return list;
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