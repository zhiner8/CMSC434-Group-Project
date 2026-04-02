//Defaul example
const DEFAULTS = {
  recipes: [
    {
      id: "r1",
      name: "Spaghetti",
      description: "",
      tags: ["Italian", "Nut-Free"],
      ingredients: ["spaghetti noodles", "tomato sauce"],
    }
  ],
  inventory: [
    { id: "i1", name: "spaghetti noodles", location: "pantry", useBy: "2028-01-01" },
    { id: "i2", name: "tomato sauce",       location: "fridge", useBy: "2026-06-02" },
    { id: "i3", name: "firm tofu",          location: "fridge", useBy: "2026-05-02" },
  ],
  shoppingLists: []
};

//helpers

//reads val from local storage and parses it back into  a JS object; returns null if nothing has been stored by with that key yet
function _get(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}
//allows data to stay consistent between pages
function _set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// checks to see if data exists in local storage; else inits with defaul spaghetti example
function initStorage() {
  for (const [key, value] of Object.entries(DEFAULTS)) {
    if (_get(key) === null) _set(key, value);
  }
}

//recipe functions//
function getRecipes(){ 
    return _get("recipes") || []; 
}
function saveRecipes(recipes)  
{ _set("recipes", recipes); 

}

function addRecipe(recipe) {
  recipe.id = "r" + Date.now();
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

//inventory fucntions//
function getInventory()           { return _get("inventory") || []; }
function saveInventory(inventory) { _set("inventory", inventory); }

function addInventoryItem(item) {
  item.id = "i" + Date.now();
  const inventory = getInventory();
  inventory.push(item);
  saveInventory(inventory);
  return item;
}

function removeInventoryItem(id) {
  saveInventory(getInventory().filter(i => i.id !== id));
}

// Shopping List Fucnitons//
function getShoppingLists()              { return _get("shoppingLists") || []; }
function saveShoppingLists(lists)        { _set("shoppingLists", lists); }

function addShoppingList(list) {
  list.id = "sl" + Date.now();
  list.items = list.items || [];
  const lists = getShoppingLists();
  lists.push(list);
  saveShoppingLists(lists);
  return list;
}

function addItemToShoppingList(listId, itemName) {
  const lists = getShoppingLists().map(l => {
    if (l.id !== listId) return l;
    return { ...l, items: [...l.items, { name: itemName, checked: false }] };
  });
  saveShoppingLists(lists);
}

//Helpers for inventory/recipe management//
function getMissingIngredients(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];
  const inStock = new Set(getInventory().map(i => i.name.toLowerCase()));
  return recipe.ingredients.filter(ing => !inStock.has(ing.toLowerCase()));
}

// filters recipes that can be made with available ingredients
function getAvailableRecipes() {
  const inStock = new Set(getInventory().map(i => i.name.toLowerCase()));
  return getRecipes().filter(r =>
    r.ingredients.every(ing => inStock.has(ing.toLowerCase()))
  );
}

// returns expired ingredients
function getExpiredItems() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return getInventory().filter(i => i.useBy && new Date(i.useBy) < today);
}