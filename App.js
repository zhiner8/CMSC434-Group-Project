class Ingredient {
  constructor(name, description, useBy, location) {
    this.name = name;
    this.description = description;
    this.useBy = useBy;
    this.location = location;
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

/* our examples */
const inventory = [
  new Ingredient("spaghetti noodles", "", (new Date("2028-01-01")), "pantry"),
  new Ingredient("tomato sauce", "", (new Date("2026-06-02")), "fridge"),
  new Ingredient("firm tofu", "", (new Date("2026-05-02")), "fridge")

  /* to continue adding */
];

const recipeBook = [
  new Recipe("Spaghetti", "", "Italian, Nut-Free", new Array(inventory[0], inventory[1]))
]


/*
const user = {
    recipes: [
      {
        name: "Spaghetti Lentil Bolognese ",
        description: "Classic pasta",
        tags: ["dinner", "italian"],
        ingredients: [
          {
            name: "lentils",
            quantity: "1 can"
          },
          {
            name: "tomato sauce",
            quantity: "2 cups"
          }
        ],
        createdAt: "2026-04-01"
      }
    ],

    inventory: {
      // allIngredients not Visible to user. Only used to check for recipe availability
      allIngredients: [
        {
          name: "milk",
          location: "fridge",
          quantity: "1 gallon",
          shelfLifeDays: 7,
        }
      ],
      
      fridge: [
        {
          name: "milk",
          location: "fridge",
          quantity: "1 gallon",
          shelfLifeDays: 7,
        }
      ],

      pantry: [
        {
          name: "rice",
          location: "pantry",
          quantity: "2 cups",
          shelfLifeDays: 180,
        }
      ],

      freezer: [
        {
          name: "frozen chicken",
          location: "freezer",
          quantity: "2 lbs",
          shelfLifeDays: 90,
        }
      ]
    },

    shopping: {
      shoppingLists: [
        {
          name: "Weekly Groceries",
          items: [
            {
              name: "eggs",
              quantity: "12",
              checked: false
            }
          ],
          createdAt: "2026-04-01"
        }
      ],

      savedTemplates: [
        {
          id: "template-1",
          name: "Basic Essentials",
          items: [
            { name: "milk", quantity: "1 gallon" },
            { name: "bread", quantity: "1 loaf" }
          ]
        }
      ]
    }
  };
*/
