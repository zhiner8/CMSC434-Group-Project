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
  constructor(name, description, tags, ingredients){
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.ingredients = ingredients;
  }
}

class ShoppingList {
  constructor(name, description, tags, date, list){
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.date = date; // date list was created
    this.list = list;
  }
}

/* will remember all ingredients previously entered into the app for ease of use */
const ingredientMemory = [
  // ingredients in our demo kitchen
  new Ingredient("spaghetti noodles", "", (new Date("2028-01-01")), "pantry", 2),
  new Ingredient("tomato sauce", "", (new Date("2026-06-02")), "fridge", 1),
  new Ingredient("firm tofu", "", (new Date("2026-05-02")), "fridge", 1),
  new Ingredient("spinach (frozen)", "", (new Date("2027-01-16")), "pantry", 1),
  new Ingredient("rice (frozen)", "", (new Date("2029-01-01")), "pantry", 1), 
  new Ingredient("peanut butter", "", (new Date("2027-01-01")), "fridge", 1),
  new Ingredient("apricot jam", "", (new Date("2026-11-01")), "fridge", 1),
  new Ingredient("almond milk", "", (new Date("2026-05-01")), "fridge", 1),
  new Ingredient("chocolate protein powder", "", (new Date("2028-05-01")), "pantry", 1),
  // ingredients in our demo shopping list
  new Ingredient("banana", "", null, "pantry", 4),
  new Ingredient("sandwich bread", "", null, "pantry", 1)
];

/* our examples */
let inventory = ingredientMemory.slice(0,8);

const recipeBook = [
  new Recipe("Tofu Bolognese", "", "Italian, Nut-Free", new Array(inventory[0], inventory[1])),
  new Recipe("Protein Shake", "", "Italian, Nut-Free", new Array(inventory[0], inventory[1]))
];

const exampleWeeklyList = [] 
exampleWeeklyList.push(ingredientMemory.slice(9,-1));

const shoppingLists = [
  new ShoppingList("04-01 Shopping List", "", "weekly", new Date("2026-04-01"), exampleWeeklyList)
];
