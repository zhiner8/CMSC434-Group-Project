const user = {
    recipes: [
      {
        name: "Spaghetti Bolognese",
        description: "Classic meat sauce pasta",
        tags: ["dinner", "italian"],
        ingredients: [
          {
            name: "ground beef",
            quantity: "1 lb"
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