let categoriesGrid =
  document.getElementById("categories-grid");

let recipesGrid =
  document.getElementById("recipes-grid");

let recipesCount =
  document.getElementById("recipes-count");

let areasContainer =
  document.getElementById("areas-container");

let searchInput =
  document.getElementById("search-input");

let searchFiltersSection =
  document.getElementById(
    "search-filters-section"
  );

let allRecipesSection =
  document.getElementById(
    "all-recipes-section"
  );

let mealDetailsSection =
  document.getElementById(
    "meal-details"
  );

let backToMealsBtn =
  document.getElementById(
    "back-to-meals-btn"
  );

let mealDetailsImage =
  document.getElementById(
    "meal-details-image"
  );

let mealDetailsName =
  document.getElementById(
    "meal-details-name"
  );

let mealDetailsCategory =
  document.getElementById(
    "meal-details-category"
  );

let mealDetailsArea =
  document.getElementById(
    "meal-details-area"
  );

let mealDetailsTags =
  document.getElementById(
    "meal-details-tags"
  );

let ingredientsContainer =
  document.getElementById(
    "ingredients-container"
  );

let ingredientsCount =
  document.getElementById(
    "ingredients-count"
  );

let instructionsContainer =
  document.getElementById(
    "instructions-container"
  );

let videoSection =
  document.getElementById(
    "video-section"
  );

let videoContainer =
  document.getElementById(
    "video-container"
  );

let productsSection =
  document.getElementById(
    "products-section"
  );

let foodlogSection =
  document.getElementById(
    "foodlog-section"
  );

let mealCategoriesSection =
  document.getElementById(
    "meal-categories-section"
  );


let currentMeal = null;

let nutritionApiUrl =
  "https://nutriplan-api.vercel.app/api/nutrition/analyze";

let nutritionApiKey =
  "tl0gKbTyhsbRJGfbkGuejQNHLskc2k6nR8lj5t3n";

let categoryStyles = {

  Beef: {
    icon: "fa-drumstick-bite",
    bg: "from-red-50 to-rose-50",
    border: "border-red-200",
    iconBg: "from-red-400 to-rose-500"
  },

  Chicken: {
    icon: "fa-drumstick-bite",
    bg: "from-orange-50 to-amber-50",
    border: "border-orange-200",
    iconBg: "from-orange-400 to-orange-500"
  },

  Dessert: {
    icon: "fa-cake-candles",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-200",
    iconBg: "from-pink-400 to-pink-500"
  },

  Lamb: {
    icon: "fa-drumstick-bite",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    iconBg: "from-orange-400 to-amber-500"
  },

  Miscellaneous: {
    icon: "fa-bowl-food",
    bg: "from-slate-50 to-gray-100",
    border: "border-slate-200",
    iconBg: "from-slate-400 to-gray-500"
  },

  Pasta: {
    icon: "fa-bowl-food",
    bg: "from-yellow-50 to-amber-50",
    border: "border-yellow-200",
    iconBg: "from-yellow-400 to-orange-500"
  },

  Pork: {
    icon: "fa-bacon",
    bg: "from-red-50 to-rose-50",
    border: "border-red-200",
    iconBg: "from-red-400 to-red-500"
  },

  Seafood: {
    icon: "fa-fish",
    bg: "from-sky-50 to-blue-50",
    border: "border-sky-200",
    iconBg: "from-sky-400 to-blue-500"
  },

  Side: {
    icon: "fa-bowl-rice",
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-200",
    iconBg: "from-emerald-400 to-green-500"
  },

  Starter: {
    icon: "fa-utensils",
    bg: "from-cyan-50 to-teal-50",
    border: "border-cyan-200",
    iconBg: "from-cyan-400 to-teal-500"
  },

  Vegan: {
    icon: "fa-leaf",
    bg: "from-emerald-50 to-green-50",
    border: "border-emerald-200",
    iconBg: "from-emerald-400 to-green-500"
  },

  Vegetarian: {
    icon: "fa-seedling",
    bg: "from-lime-50 to-green-50",
    border: "border-lime-200",
    iconBg: "from-lime-400 to-green-500"
  },

  Breakfast: {
    icon: "fa-mug-hot",
    bg: "from-orange-50 to-yellow-50",
    border: "border-orange-200",
    iconBg: "from-orange-400 to-yellow-500"
  },

  Goat: {
    icon: "fa-drumstick-bite",
    bg: "from-stone-50 to-orange-50",
    border: "border-stone-200",
    iconBg: "from-stone-400 to-stone-600"
  }

};

let selectedAreas = [

  "Egyptian",
  "American",
  "British",
  "Italian",
  "Japanese",
  "Chinese",
  "Indian",
  "Mexican",
  "French",
  "Greek"

];


async function getCategories() {

  try {

    let response =
      await fetch(
        "https://nutriplan-api.vercel.app/api/meals/categories"
      );

    let data =
      await response.json();

    displayCategoryCards(
      data.results
    );

  } catch (error) {

    console.log(
      "Categories error:",
      error
    );

  }

}

function displayCategoryCards(categories) {

  if (!categoriesGrid) {

    return;

  }

  let cartona = "";

  for (
    let i = 0;
    i < categories.length;
    i++
  ) {

    let category =
      categories[i];

    let style =
      categoryStyles[
        category.name
      ];

    if (!style) {

      style = {

        icon:
          "fa-utensils",

        bg:
          "from-gray-50 to-slate-100",

        border:
          "border-gray-200",

        iconBg:
          "from-gray-400 to-gray-500"

      };

    }

    cartona += `

      <div
        class="category-card bg-gradient-to-br ${style.bg} rounded-xl p-3 border ${style.border} hover:shadow-md cursor-pointer transition-all group"
        data-category="${category.name}"
      >

        <div class="flex items-center gap-2.5">

          <div
            class="text-white w-9 h-9 bg-gradient-to-br ${style.iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
          >

            <i
              class="fa-solid ${style.icon}"
            ></i>

          </div>

          <div>

            <h3
              class="text-sm font-bold text-gray-900"
            >

              ${category.name}

            </h3>

          </div>

        </div>

      </div>

    `;

  }

  categoriesGrid.innerHTML =
    cartona;

  addCategoryEvents();

}


function addCategoryEvents() {

  let categoryCards =
    document.querySelectorAll(
      ".category-card"
    );

  for (
    let i = 0;
    i < categoryCards.length;
    i++
  ) {

    categoryCards[i].addEventListener(
      "click",
      function () {

        let category =
          categoryCards[i].dataset.category;

        if (category) {

          getMealsByCategory(
            category
          );

        }

      }
    );

  }

}
let nutritionFactsContainer = document.getElementById(
  "nutrition-facts-container"
);

async function getMealsByCategory(category) {

  try {

    let response =
      await fetch(

        `https://nutriplan-api.vercel.app/api/meals/filter?category=${encodeURIComponent(
          category
        )}&page=1&limit=25`

      );

    let data =
      await response.json();

    if (
      !data.results ||
      data.results.length === 0
    ) {

      showNoRecipes(
        category
      );

      return;

    }

    displayRecipeCards(
      data.results
    );

  } catch (error) {

    console.log(
      "Category meals error:",
      error
    );

    showNoRecipes(
      category
    );

  }

}

async function getMealsByArea(area) {

  try {

    let response =
      await fetch(

        `https://nutriplan-api.vercel.app/api/meals/filter?area=${encodeURIComponent(
          area
        )}&page=1&limit=25`

      );

    let data =
      await response.json();

    if (
      !data.results ||
      data.results.length === 0
    ) {

      showNoRecipes(
        area
      );

      return;

    }

    displayRecipeCards(
      data.results
    );

  } catch (error) {

    console.log(
      "Area meals error:",
      error
    );

    showNoRecipes(
      area
    );

  }

}

function showNoRecipes(area) {

  if (
    !recipesGrid ||
    !recipesCount
  ) {

    return;

  }

  recipesGrid.innerHTML = `

    <div
      class="col-span-full text-center py-12"
    >

      <i
        class="fa-solid fa-utensils text-4xl text-gray-300 mb-4"
      ></i>

      <h3
        class="text-lg font-bold text-gray-700"
      >

        No recipes found

      </h3>

      <p
        class="text-sm text-gray-500 mt-2"
      >

        There are no recipes available for ${area}.

      </p>

    </div>

  `;

  recipesCount.innerHTML =
    "Showing 0 recipes";

}


function displayRecipeCards(meals) {

  if (
    !recipesGrid ||
    !recipesCount
  ) {

    return;

  }

  let cartona = "";

  for (
    let i = 0;
    i < meals.length;
    i++
  ) {

    let meal =
      meals[i];

    cartona += `

      <div
        class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-meal-id="${meal.id}"
      >

        <div
          class="relative h-48 overflow-hidden"
        >

          <img
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src="${meal.thumbnail}"
            alt="${meal.name}"
            loading="lazy"
          >

          <div
            class="absolute bottom-3 left-3 flex gap-2"
          >

            <span
              class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
            >

              <i
                class="fa-solid fa-tag text-emerald-600 mr-1"
              ></i>

              ${meal.category || "Unknown"}

            </span>

          </div>

        </div>

        <div class="p-4">

          <h3
            class="text-base font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1"
          >

            ${meal.name}

          </h3>

          <p
            class="text-xs text-gray-600 mb-3 line-clamp-2"
          >

            ${
              meal.instructions &&
              meal.instructions.length > 0

                ? meal.instructions[0]

                : "Delicious recipe to try!"
            }

          </p>

          <div
            class="flex items-center justify-between text-xs"
          >

            <span
              class="font-semibold text-gray-900"
            >

              <i
                class="fa-solid fa-utensils text-emerald-600 mr-1"
              ></i>

              ${meal.category || "Unknown"}

            </span>

            <span
              class="font-semibold text-gray-500"
            >

              <i
                class="fa-solid fa-globe text-blue-500 mr-1"
              ></i>

              ${meal.area || "International"}

            </span>

          </div>

        </div>

      </div>

    `;

  }

  recipesGrid.innerHTML =
    cartona;

  recipesCount.innerHTML =
    `Showing ${meals.length} recipes`;

}

async function getAreas() {

  try {

    let response =
      await fetch(
        "https://nutriplan-api.vercel.app/api/meals/areas"
      );

    let data =
      await response.json();

    displayAreas(
      data.results
    );

  } catch (error) {

    console.log(
      "Areas error:",
      error
    );

  }

}


function displayAreas(areas) {

  if (!areasContainer) {

    return;

  }

  let cartona = `

    <button
      class="area-btn px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
      data-area="all"
    >

      All Recipes

    </button>

  `;

  for (
    let i = 0;
    i < selectedAreas.length;
    i++
  ) {

    let areaName =
      selectedAreas[i];

    let areaExists =
      areas.find(
        function (area) {

          return (
            area.name === areaName
          );

        }
      );

    if (areaExists) {

      cartona += `

        <button
          class="area-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
          data-area="${areaName}"
        >

          ${areaName}

        </button>

      `;

    }

  }

  areasContainer.innerHTML =
    cartona;

  addAreaEvents();

}

function addAreaEvents() {

  let areaButtons =
    document.querySelectorAll(
      ".area-btn"
    );

  for (
    let i = 0;
    i < areaButtons.length;
    i++
  ) {

    areaButtons[i].addEventListener(
      "click",
      function () {

        let selectedArea =
          areaButtons[i].dataset.area;

        for (
          let j = 0;
          j < areaButtons.length;
          j++
        ) {

          areaButtons[j].classList.remove(
            "bg-emerald-600",
            "text-white"
          );

          areaButtons[j].classList.add(
            "bg-gray-100",
            "text-gray-700"
          );

        }

        areaButtons[i].classList.remove(
          "bg-gray-100",
          "text-gray-700"
        );

        areaButtons[i].classList.add(
          "bg-emerald-600",
          "text-white"
        );

        if (
          selectedArea === "all"
        ) {

          getMealsByCategory(
            "Seafood"
          );

          return;

        }

        if (selectedArea) {

          getMealsByArea(
            selectedArea
          );

        }

      }
    );

  }

}

if (recipesGrid) {

  recipesGrid.addEventListener(
    "click",
    async function (event) {

      let card =
        event.target.closest(
          ".recipe-card"
        );

      if (!card) {

        return;

      }

      let mealId =
        card.dataset.mealId;

      if (!mealId) {

        return;

      }

      await getMealDetails(
        mealId
      );

    }
  );

}

async function getMealDetails(id) {

  try {


    let response =
      await fetch(
        `https://nutriplan-api.vercel.app/api/meals/${id}`
      );


    if (!response.ok) {

      throw new Error(
        "Could not load meal details"
      );

    }


    let data =
      await response.json();


    let meal =
      data.result ||
      data.meal ||
      data.results?.[0] ||
      data;


    console.log(
      "MEAL DETAILS:",
      meal
    );


    displayMealDetails(
      meal
    );


    currentMeal =
      null;


    let nutritionData =
      await mlhanad(
        meal
      );


    console.log(
      "FINAL NUTRITION DATA:",
      nutritionData
    );


    let nutrients =
      getItemNutrients(
        nutritionData
      );


    console.log(
      "EXTRACTED MEAL NUTRIENTS:",
      nutrients
    );



    let hasNutrition =

      nutrients.calories > 0 ||

      nutrients.protein > 0 ||

      nutrients.carbs > 0 ||

      nutrients.fat > 0;


    if (!hasNutrition) {

      console.warn(
        "NO NUTRITION DATA FOUND"
      );

    }


    meal.nutrients =
      nutrients;




    currentMeal =
      meal;


    console.log(
      "CURRENT MEAL READY:",
      currentMeal
    );


    console.log(
      "CURRENT MEAL NUTRIENTS:",
      currentMeal.nutrients
    );


    if (nutritionData) {

      displayNutrition(
        nutritionData
      );

    }


    return currentMeal;


  } catch (error) {

    console.error(
      "Meal details error:",
      error
    );


    currentMeal =
      null;


    return null;

  }

}

async function mlhanad(meal) {

  try {

    if (
      !meal ||
      !Array.isArray(
        meal.ingredients
      ) ||
      meal.ingredients.length === 0
    ) {

      throw new Error(
        "Meal has no ingredients"
      );

    }


    let ingredients = [];


    for (
      let i = 0;
      i < meal.ingredients.length;
      i++
    ) {

      let item =
        meal.ingredients[i] || {};

      let ingredient =
        item.ingredient || "";

      let measure =
        item.measure || "";


      if (
        ingredient.trim() !== ""
      ) {

        ingredients.push(
          `${measure} ${ingredient}`.trim()
        );

      }

    }


    console.log(
      "INGREDIENTS SENT TO NUTRITION API:",
      ingredients
    );


    let response =
      await fetch(
        nutritionApiUrl,
        {

          method:
            "POST",

          headers: {

            "Content-Type":
              "application/json",

            "x-api-key":
              nutritionApiKey

          },

          body:
            JSON.stringify({

              title:
                meal.name || "Meal",

              ingredients:
                ingredients,

              servings:
                1

            })

        }
      );


    console.log(
      "NUTRITION RESPONSE STATUS:",
      response.status
    );


    let data =
      await response.json();


    console.log(
      "FULL NUTRITION API RESPONSE:",
      data
    );


    if (!response.ok) {

      console.error(
        "Nutrition API Error:",
        data
      );

      throw new Error(
        data.error ||
        "Could not analyze meal nutrition"
      );

    }


    return data;


  } catch (error) {

    console.error(
      "Nutrition analysis error:",
      error
    );

    return null;

  }

}


function displayNutrition(data) {

  if (!nutritionFactsContainer) {
    return;
  }


  console.log(
    "NUTRITION:",
    data
  );


  let nutrition =
    data.result ||
    data.data ||
    data;




  let perServing =
    nutrition.perServing || {};
 

  let totals =
    nutrition.totals || {};



  let calories =
    perServing.calories || 0;

  let protein =
    perServing.protein || 0;


  let carbs =
    perServing.carbs || 0;



  let fat =
    perServing.fat || 0;


  let fiber =
    perServing.fiber || 0;


  let sugar =
    perServing.sugar || 0;


  nutritionFactsContainer.innerHTML = `

    <p class="text-sm text-gray-500 mb-4">

      Per serving

    </p>


    <div
      class="text-center py-4 mb-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl"
    >

      <p class="text-sm text-gray-600">

        Calories per serving

      </p>


      <p class="text-4xl font-bold text-emerald-600">

        ${Math.round(calories)}

      </p>


      <p class="text-xs text-gray-500 mt-1">

        Total: ${Math.round(
          totals.calories || 0
        )} cal

      </p>

    </div>


    <div class="space-y-4">


      <!-- Protein -->

      <div class="flex items-center justify-between">

        <div class="flex items-center gap-2">

          <div
            class="w-3 h-3 rounded-full bg-emerald-500"
          ></div>

          <span class="text-gray-700">

            Protein

          </span>

        </div>


        <span class="font-bold text-gray-900">

          ${Number(protein).toFixed(1)}g

        </span>

      </div>


      <div class="w-full bg-gray-100 rounded-full h-2">

        <div
          class="bg-emerald-500 h-2 rounded-full"
          style="width: ${Math.min(
            (protein / 50) * 100,
            100
          )}%"
        ></div>

      </div>



      <!-- Carbs -->

      <div class="flex items-center justify-between">

        <div class="flex items-center gap-2">

          <div
            class="w-3 h-3 rounded-full bg-blue-500"
          ></div>

          <span class="text-gray-700">

            Carbs

          </span>

        </div>


        <span class="font-bold text-gray-900">

          ${Number(carbs).toFixed(1)}g

        </span>

      </div>


      <div class="w-full bg-gray-100 rounded-full h-2">

        <div
          class="bg-blue-500 h-2 rounded-full"
          style="width: ${Math.min(
            (carbs / 300) * 100,
            100
          )}%"
        ></div>

      </div>



      <!-- Fat -->

      <div class="flex items-center justify-between">

        <div class="flex items-center gap-2">

          <div
            class="w-3 h-3 rounded-full bg-purple-500"
          ></div>

          <span class="text-gray-700">

            Fat

          </span>

        </div>


        <span class="font-bold text-gray-900">

          ${Number(fat).toFixed(1)}g

        </span>

      </div>


      <div class="w-full bg-gray-100 rounded-full h-2">

        <div
          class="bg-purple-500 h-2 rounded-full"
          style="width: ${Math.min(
            (fat / 78) * 100,
            100
          )}%"
        ></div>

      </div>



      <!-- Fiber -->

      <div class="flex items-center justify-between">

        <div class="flex items-center gap-2">

          <div
            class="w-3 h-3 rounded-full bg-orange-500"
          ></div>

          <span class="text-gray-700">

            Fiber

          </span>

        </div>


        <span class="font-bold text-gray-900">

          ${Number(fiber).toFixed(1)}g

        </span>

      </div>


      <div class="w-full bg-gray-100 rounded-full h-2">

        <div
          class="bg-orange-500 h-2 rounded-full"
          style="width: ${Math.min(
            (fiber / 28) * 100,
            100
          )}%"
        ></div>

      </div>



      <!-- Sugar -->

      <div class="flex items-center justify-between">

        <div class="flex items-center gap-2">

          <div
            class="w-3 h-3 rounded-full bg-pink-500"
          ></div>

          <span class="text-gray-700">

            Sugar

          </span>

        </div>


        <span class="font-bold text-gray-900">

          ${Number(sugar).toFixed(1)}g

        </span>

      </div>


      <div class="w-full bg-gray-100 rounded-full h-2">

        <div
          class="bg-pink-500 h-2 rounded-full"
          style="width: ${Math.min(
            (sugar / 50) * 100,
            100
          )}%"
        ></div>

      </div>


    </div>

  `;

}


function extractNutritionValues(data) {

  let result = {

    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,

    vitaminA: 0,
    vitaminC: 0,
    calcium: 0,
    iron: 0

  };


  if (!data) {

    return result;

  }


  console.log(
    "EXTRACTING FROM:",
    data
  );


  let source =
    data.result ||
    data.nutrients ||
    data;



  result.calories =
    Number(

      source.calories ||
      source.caloriesPerServing ||
      source.energy ||
      source.kcal ||
      0

    );



  result.protein =
    Number(

      source.protein ||
      source.protein_g ||
      0

    );


  result.carbs =
    Number(

      source.carbs ||
      source.carbohydrates ||
      source.carbohydrate ||
      source.carbohydrate_g ||
      0

    );


  result.fat =
    Number(

      source.fat ||
      source.totalFat ||
      source.fat_g ||
      0

    );


  result.fiber =
    Number(

      source.fiber ||
      source.dietaryFiber ||
      source.fiber_g ||
      0

    );


  result.sugar =
    Number(

      source.sugar ||
      source.sugars ||
      source.sugar_g ||
      0

    );


  result.vitaminA =
    Number(

      source.vitaminA ||
      source.vitamin_a ||
      0

    );


  result.vitaminC =
    Number(

      source.vitaminC ||
      source.vitamin_c ||
      0

    );

  result.calcium =
    Number(

      source.calcium ||
      0

    );


  result.iron =
    Number(

      source.iron ||
      0

    );


  console.log(
    "EXTRACTED NUTRIENTS:",
    result
  );


  return result;

}



function formatNutritionNumber(value) {

  let number =
    Number(value);

  if (
    !Number.isFinite(number)
  ) {

    return "0";

  }

  if (
    Number.isInteger(number)
  ) {

    return number.toString();

  }

  return number.toFixed(1);

}


function updateNutritionCard(nutrients) {

  if (!nutrients) {

    return;

  }


 

  let caloriesElement =
    document.getElementById(
      "meal-calories"
    );

  if (caloriesElement) {

    caloriesElement.textContent =
      formatNutritionNumber(
        nutrients.calories
      );

  }




  let proteinElement =
    document.getElementById(
      "meal-protein"
    );

  if (proteinElement) {

    proteinElement.textContent =
      `${formatNutritionNumber(
        nutrients.protein
      )}g`;

  }



  let carbsElement =
    document.getElementById(
      "meal-carbs"
    );

  if (carbsElement) {

    carbsElement.textContent =
      `${formatNutritionNumber(
        nutrients.carbs
      )}g`;

  }



  let fatElement =
    document.getElementById(
      "meal-fat"
    );

  if (fatElement) {

    fatElement.textContent =
      `${formatNutritionNumber(
        nutrients.fat
      )}g`;

  }



  let fiberElement =
    document.getElementById(
      "meal-fiber"
    );

  if (fiberElement) {

    fiberElement.textContent =
      `${formatNutritionNumber(
        nutrients.fiber
      )}g`;

  }


  let sugarElement =
    document.getElementById(
      "meal-sugar"
    );

  if (sugarElement) {

    sugarElement.textContent =
      `${formatNutritionNumber(
        nutrients.sugar
      )}g`;

  }


  let vitaminAElement =
    document.getElementById(
      "meal-vitamin-a"
    );

  if (vitaminAElement) {

    vitaminAElement.textContent =
      `${formatNutritionNumber(
        nutrients.vitaminA
      )}%`;

  }


  let vitaminCElement =
    document.getElementById(
      "meal-vitamin-c"
    );

  if (vitaminCElement) {

    vitaminCElement.textContent =
      `${formatNutritionNumber(
        nutrients.vitaminC
      )}%`;

  }


  let calciumElement =
    document.getElementById(
      "meal-calcium"
    );

  if (calciumElement) {

    calciumElement.textContent =
      `${formatNutritionNumber(
        nutrients.calcium
      )}%`;

  }


  let ironElement =
    document.getElementById(
      "meal-iron"
    );

  if (ironElement) {

    ironElement.textContent =
      `${formatNutritionNumber(
        nutrients.iron
      )}%`;

  }

}


function displayMealDetails(meal) {

  currentMeal =
    meal;

  if (mealDetailsImage) {

    mealDetailsImage.src =
      meal.thumbnail;

    mealDetailsImage.alt =
      meal.name;

  }


  if (mealDetailsName) {

    mealDetailsName.innerHTML =
      meal.name;

  }

  if (mealDetailsCategory) {

    mealDetailsCategory.innerHTML =
      meal.category || "Unknown";

  }


  if (mealDetailsArea) {

    mealDetailsArea.innerHTML =
      meal.area || "Unknown";

  }


  updateNutritionCard(
    meal.nutrients
  );


  let tagsCartona = "";

  if (
    meal.tags &&
    meal.tags.length > 0
  ) {

    for (
      let i = 0;
      i < meal.tags.length;
      i++
    ) {

      tagsCartona += `

        <span
          class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
        >

          ${meal.tags[i]}

        </span>

      `;

    }

  }

  if (mealDetailsTags) {

    mealDetailsTags.innerHTML =
      tagsCartona;

  }


  if (ingredientsCount) {

    ingredientsCount.innerHTML =
      `${meal.ingredients.length} items`;

  }


  let ingredientsCartona = "";

  for (
    let i = 0;
    i < meal.ingredients.length;
    i++
  ) {

    let item =
      meal.ingredients[i];

    ingredientsCartona += `

      <div
        class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
      >

        <input
          type="checkbox"
          class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
        >

        <span class="text-gray-700">

          <span
            class="font-medium text-gray-900"
          >

            ${item.measure || ""}

          </span>

          ${item.ingredient || ""}

        </span>

      </div>

    `;

  }

  if (ingredientsContainer) {

    ingredientsContainer.innerHTML =
      ingredientsCartona;

  }


  let instructionsCartona = "";

  for (
    let i = 0;
    i < meal.instructions.length;
    i++
  ) {

    instructionsCartona += `

      <div
        class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
      >

        <div
          class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
        >

          ${i + 1}

        </div>

        <p
          class="text-gray-700 leading-relaxed pt-2"
        >

          ${meal.instructions[i]}

        </p>

      </div>

    `;

  }

  if (instructionsContainer) {

    instructionsContainer.innerHTML =
      instructionsCartona;

  }


  if (
    meal.youtube &&
    meal.youtube !== ""
  ) {

    let videoId =
      getYoutubeVideoId(
        meal.youtube
      );

    if (
      videoId &&
      videoContainer
    ) {

      videoContainer.innerHTML = `

        <iframe
          src="https://www.youtube.com/embed/${videoId}"
          class="absolute inset-0 w-full h-full"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

      `;

      if (videoSection) {

        videoSection.classList.remove(
          "hidden"
        );

      }

    }

  } else {

    if (videoContainer) {

      videoContainer.innerHTML =
        "";

    }

    if (videoSection) {

      videoSection.classList.add(
        "hidden"
      );

    }

  }


  showMealDetails();

}


function getYoutubeVideoId(url) {

  try {

    let urlObject =
      new URL(url);

    return urlObject.searchParams.get(
      "v"
    );

  } catch (error) {

    console.log(
      error
    );

    return null;

  }

}


function showMealDetails() {

  if (productsSection) {

    productsSection.classList.add(
      "hidden"
    );

  }

  if (foodlogSection) {

    foodlogSection.classList.add(
      "hidden"
    );

  }

  if (mealCategoriesSection) {

    mealCategoriesSection.classList.add(
      "hidden"
    );

  }

  if (searchFiltersSection) {

    searchFiltersSection.classList.add(
      "hidden"
    );

  }

  if (allRecipesSection) {

    allRecipesSection.classList.add(
      "hidden"
    );

  }

  if (mealDetailsSection) {

    mealDetailsSection.classList.remove(
      "hidden"
    );

  }

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


if (backToMealsBtn) {

  backToMealsBtn.addEventListener(
    "click",
    function () {

      if (mealDetailsSection) {

        mealDetailsSection.classList.add(
          "hidden"
        );

      }

      if (productsSection) {

        productsSection.classList.remove(
          "hidden"
        );

      }

      if (foodlogSection) {

        foodlogSection.classList.remove(
          "hidden"
        );

      }

      if (mealCategoriesSection) {

        mealCategoriesSection.classList.remove(
          "hidden"
        );

      }

      if (searchFiltersSection) {

        searchFiltersSection.classList.remove(
          "hidden"
        );

      }

      if (allRecipesSection) {

        allRecipesSection.classList.remove(
          "hidden"
        );

      }

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );

}


async function searchMeals() {

  if (!searchInput) {

    return;

  }

  let searchValue =
    searchInput.value.trim();

  if (searchValue === "") {

    getMealsByCategory(
      "Seafood"
    );

    return;

  }

  try {

    let response =
      await fetch(

        `https://nutriplan-api.vercel.app/api/meals/search?q=${encodeURIComponent(
          searchValue
        )}&page=1&limit=25`

      );

    let data =
      await response.json();

    if (
      !data.results ||
      data.results.length === 0
    ) {

      showNoRecipes(
        searchValue
      );

      return;

    }

    displayRecipeCards(
      data.results
    );

  } catch (error) {

    console.log(
      "Search error:",
      error
    );

  }

}


if (searchInput) {

  searchInput.addEventListener(
    "input",
    function () {

      searchMeals();

    }
  );

}

if (mealDetailsSection) {

  mealDetailsSection.classList.add(
    "hidden"
  );

}

let productsGrid = document.getElementById(
  "products-grid"
);

let productsCount = document.getElementById(
  "products-count"
);

let productSearchInput = document.getElementById(
  "product-search-input"
);

let searchProductBtn = document.getElementById(
  "search-product-btn"
);

let barcodeInput = document.getElementById(
  "barcode-input"
);

let lookupBarcodeBtn = document.getElementById(
  "lookup-barcode-btn"
);

function showInitialProductsState() {

  if (
    !productsGrid ||
    !productsCount
  ) {

    return;

  }

  productsGrid.innerHTML = `

    <div
      class="col-span-full min-h-[300px] flex flex-col items-center justify-center text-center py-12"
    >

      <div
        class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-5"
      >

        <i
          class="fa-solid fa-box-open text-2xl text-gray-400"
        ></i>

      </div>

      <h3
        class="text-l font-medium text-gray-600"
      >
        No products to display
      </h3>

    </div>

  `;

  productsCount.innerHTML =
    "No products to display";

}

function getProductPlaceholder() {

  return `

    <div
      class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-lime-50 to-yellow-50 text-gray-400"
    >

      <div
        class="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-3"
      >

        <i
          class="fa-solid fa-box-open text-4xl text-emerald-500"
        ></i>

      </div>

      <div
        class="flex items-center gap-2 text-emerald-600"
      >

        <i class="fa-solid fa-apple-whole"></i>

        <span class="text-sm font-medium">

          Product image unavailable

        </span>

      </div>

    </div>

  `;

}

function getBarcodeImage(barcode) {

  if (!barcode) {

    return "";

  }

  let cleanBarcode =
    String(barcode)
      .replace(/\D/g, "");

  if (cleanBarcode.length < 4) {

    return "";

  }

  let barcodePath;

  if (cleanBarcode.length <= 8) {

    barcodePath =
      cleanBarcode;

  } else {

    let firstPart =
      cleanBarcode.substring(0, 3);

    let secondPart =
      cleanBarcode.substring(3, 6);

    let thirdPart =
      cleanBarcode.substring(6, 9);

    let remainingPart =
      cleanBarcode.substring(9);

    barcodePath =
      `${firstPart}/${secondPart}/${thirdPart}/${remainingPart}`;

  }

  return `https://images.openfoodfacts.org/images/products/${barcodePath}/front_en.400.jpg`;

}

async function searchProducts() {

  if (
    !productSearchInput ||
    !productsGrid ||
    !productsCount
  ) {

    return;

  }

  let searchValue =
    productSearchInput.value.trim();

  // لو المستخدم مسح البحث
  // نرجع للـ Empty State الأساسي

  if (searchValue === "") {

    showInitialProductsState();

    return;

  }

  try {

    let response = await fetch(
      `https://nutriplan-api.vercel.app/api/products/search?q=${encodeURIComponent(searchValue)}&page=1&limit=24`
    );

    let data =
      await response.json();

    console.log(data);

    if (
      !data.results ||
      data.results.length === 0
    ) {

      showNoProducts();

      return;

    }

    displayProducts(
      data.results
    );

  } catch (error) {

    console.log(error);

    showNoProducts();

  }

}

function showNoProducts() {

  if (
    !productsGrid ||
    !productsCount
  ) {

    return;

  }

  productsGrid.innerHTML = `

    <div
      class="col-span-full min-h-[300px] flex flex-col items-center justify-center text-center py-12"
    >

      <div
        class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5"
      >

        <i
          class="fa-solid fa-box-open text-4xl text-gray-400"
        ></i>

      </div>

      <h3
        class="text-xl font-medium text-gray-600"
      >

        No products found

      </h3>

      <p
        class="text-sm text-gray-500 mt-2"
      >

        Try searching for another product.

      </p>

    </div>

  `;

  productsCount.innerHTML =
    "Showing 0 products";

}

function displayProducts(products) {

  if (
    !productsGrid ||
    !productsCount
  ) {

    return;

  }

  if (
    !products ||
    products.length === 0
  ) {

    showNoProducts();

    return;

  }

  let cartona = "";

  for (
    let i = 0;
    i < products.length;
    i++
  ) {

    let product =
      products[i];

    let productImage =
      product.image &&
      product.image.trim() !== ""
        ? product.image
        : "";

    let fallbackImage =
      getBarcodeImage(
        product.barcode
      );

    let imageContent;

    if (productImage !== "") {

      imageContent = `

        <img
          class="product-image w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          src="${productImage}"
          data-fallback="${fallbackImage}"
          alt="${product.name || "Product"}"
          loading="lazy"
        >

      `;

    } else if (
      fallbackImage !== ""
    ) {

      imageContent = `

        <img
          class="product-image w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          src="${fallbackImage}"
          data-fallback=""
          alt="${product.name || "Product"}"
          loading="lazy"
        >

      `;

    } else {

      imageContent =
        getProductPlaceholder();

    }

    cartona += `

      <div
        class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-barcode="${product.barcode || ""}"
      >

        <div
          class="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden"
        >

          ${imageContent}

          <div
            class="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
          >

            Nutri-Score
            ${product.nutritionGrade || "Unknown"}

          </div>

          ${
            product.novaGroup
              ? `

                <div
                  class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center"
                  title="NOVA ${product.novaGroup}"
                >

                  ${product.novaGroup}

                </div>

              `
              : ""
          }

        </div>

        <div class="p-4">

          <p
            class="text-xs text-emerald-600 font-semibold mb-1 truncate"
          >

            ${product.brand || "Unknown Brand"}

          </p>

          <h3
            class="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors"
          >

            ${product.name || "Unknown Product"}

          </h3>

          <div
            class="flex items-center gap-3 text-xs text-gray-500 mb-3"
          >

            <span>

              <i
                class="fa-solid fa-fire mr-1"
              ></i>

              ${
                product.nutrients?.calories !== undefined
                  ? Number(
                      product.nutrients.calories
                    ).toFixed(1)
                  : "0.0"
              }

              kcal

            </span>

          </div>

          <div
            class="grid grid-cols-4 gap-1 text-center"
          >

            <div
              class="bg-emerald-50 rounded p-1.5"
            >

              <p
                class="text-xs font-bold text-emerald-700"
              >

                ${
                  product.nutrients?.protein !== undefined
                    ? Number(
                        product.nutrients.protein
                      ).toFixed(1)
                    : "0.0"
                }g

              </p>

              <p class="text-[10px] text-gray-500">
                Protein
              </p>

            </div>

            <div
              class="bg-blue-50 rounded p-1.5"
            >

              <p
                class="text-xs font-bold text-blue-700"
              >

                ${
                  product.nutrients?.carbs !== undefined
                    ? Number(
                        product.nutrients.carbs
                      ).toFixed(1)
                    : "0.0"
                }g

              </p>

              <p class="text-[10px] text-gray-500">
                Carbs
              </p>

            </div>

            <div
              class="bg-purple-50 rounded p-1.5"
            >

              <p
                class="text-xs font-bold text-purple-700"
              >

                ${
                  product.nutrients?.fat !== undefined
                    ? Number(
                        product.nutrients.fat
                      ).toFixed(1)
                    : "0.0"
                }g

              </p>

              <p class="text-[10px] text-gray-500">
                Fat
              </p>

            </div>

            <div
              class="bg-orange-50 rounded p-1.5"
            >

              <p
                class="text-xs font-bold text-orange-700"
              >

                ${
                  product.nutrients?.sugar !== undefined
                    ? Number(
                        product.nutrients.sugar
                      ).toFixed(1)
                    : "0.0"
                }g

              </p>

              <p class="text-[10px] text-gray-500">
                Sugar
              </p>

            </div>

          </div>

        </div>

      </div>

    `;

  }

  productsGrid.innerHTML =
    cartona;

  productsCount.innerHTML =
    `Showing ${products.length} products`;

  let productImages =
    productsGrid.querySelectorAll(
      ".product-image"
    );

  for (
    let i = 0;
    i < productImages.length;
    i++
  ) {

    productImages[i].addEventListener(
      "error",
      function () {

        let fallback =
          this.dataset.fallback;

        if (
          fallback &&
          fallback !== ""
        ) {

          this.dataset.fallback = "";

          this.src =
            fallback;

        } else {

          let imageContainer =
            this.parentElement;

          if (imageContainer) {

            this.remove();

            imageContainer.insertAdjacentHTML(
              "afterbegin",
              getProductPlaceholder()
            );

          }

        }

      }
    );

  }

}

if (productsGrid) {

  productsGrid.addEventListener(
    "click",
    function (event) {

      let card =
        event.target.closest(".product-card");

      if (!card) {

        return;

      }

      let barcode =
        card.dataset.barcode;

      if (barcode) {

        getProductDetailsByBarcode(
          barcode
        );

      }

    }
  );

}

if (searchProductBtn) {

  searchProductBtn.addEventListener(
    "click",
    function () {

      searchProducts();

    }
  );

}

if (productSearchInput) {

  productSearchInput.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Enter") {

        searchProducts();

      }

    }
  );

}

let productDetailsModal = document.getElementById(
  "product-details-modal"
);

let closeProductModal = document.getElementById(
  "close-product-modal"
);

let modalCloseBtn = document.getElementById(
  "modal-close-btn"
);

let modalProductImage = document.getElementById(
  "modal-product-image"
);

let modalProductBrand = document.getElementById(
  "modal-product-brand"
);

let modalProductName = document.getElementById(
  "modal-product-name"
);

let modalProductQuantity = document.getElementById(
  "modal-product-quantity"
);

let modalNutriGrade = document.getElementById(
  "modal-nutri-grade"
);

let modalNutriText = document.getElementById(
  "modal-nutri-text"
);

let modalNovaGroup = document.getElementById(
  "modal-nova-group"
);

let modalNovaText = document.getElementById(
  "modal-nova-text"
);

let modalCalories = document.getElementById(
  "modal-calories"
);

let modalProtein = document.getElementById(
  "modal-protein"
);

let modalCarbs = document.getElementById(
  "modal-carbs"
);

let modalFat = document.getElementById(
  "modal-fat"
);

let modalSugar = document.getElementById(
  "modal-sugar"
);

let modalSaturatedFat = document.getElementById(
  "modal-saturated-fat"
);

let modalFiber = document.getElementById(
  "modal-fiber"
);

let modalSodium = document.getElementById(
  "modal-sodium"
);

let modalProductIngredients = document.getElementById(
  "modal-product-ingredients"
);

function getNutriScoreText(grade) {

  let scores = {

    a: "Excellent",
    b: "Good",
    c: "Average",
    d: "Poor",
    e: "Bad",
    unknown: "Unknown"

  };

  return scores[grade] ||
    "Unknown";

}

function getNovaText(group) {

  let groups = {

    1: "Unprocessed",
    2: "Processed culinary",
    3: "Processed",
    4: "Ultra-processed"

  };

  return groups[group] ||
    "Unknown";

}


function formatNumber(number) {

  if (
    number === null ||
    number === undefined ||
    number === ""
  ) {

    return "0.0";

  }

  let parsedNumber =
    Number(number);

  if (Number.isNaN(parsedNumber)) {

    return "0.0";

  }

  return parsedNumber.toFixed(1);

}

function displayProductDetails(product) {


  currentProduct = product;


  console.log(
    "CURRENT PRODUCT:",
    currentProduct
  );

  if (modalProductImage) {

    let fallbackImage =
      getBarcodeImage(
        product.barcode
      );


    let mainImage =
      product.image &&
      product.image.trim() !== ""
        ? product.image
        : fallbackImage;


    if (mainImage !== "") {

      modalProductImage.src =
        mainImage;

      modalProductImage.style.display =
        "block";

    } else {

      modalProductImage.style.display =
        "none";

    }


    modalProductImage.alt =
      product.name ||
      "Product";

    modalProductImage.onerror =
      function () {

        let fallback =
          getBarcodeImage(
            product.barcode
          );


        if (
          fallback &&
          fallback !== "" &&
          this.src !== fallback
        ) {

          this.onerror =
            function () {

              this.style.display =
                "none";

            };


          this.src =
            fallback;

        } else {

          this.style.display =
            "none";

        }

      };

    modalProductImage.onload =
      function () {

        this.style.display =
          "block";

      };

  }


  if (modalProductBrand) {

    modalProductBrand.innerHTML =
      product.brand ||
      "Unknown Brand";

  }


  if (modalProductName) {

    modalProductName.innerHTML =
      product.name ||
      "Unknown Product";

  }


  if (modalProductQuantity) {

    modalProductQuantity.innerHTML =
      product.quantity ||
      product.servingSize ||
      "Not available";

  }


  let grade =
    product.nutritionGrade
      ? product.nutritionGrade
          .toLowerCase()
      : "unknown";


  if (modalNutriGrade) {

    modalNutriGrade.innerHTML =
      grade === "unknown"
        ? "?"
        : grade.toUpperCase();

  }


  if (modalNutriText) {

    modalNutriText.innerHTML =
      getNutriScoreText(
        grade
      );

  }


  let nova =
    product.novaGroup;


  if (modalNovaGroup) {

    modalNovaGroup.innerHTML =
      nova ?? "N/A";

  }


  if (modalNovaText) {

    modalNovaText.innerHTML =
      getNovaText(
        nova
      );

  }


  let nutrients =
    product.nutrients ||
    {};


  if (modalCalories) {

    modalCalories.innerHTML =
      formatNumber(
        nutrients.calories
      );

  }

  if (modalProtein) {

    modalProtein.innerHTML =
      `${formatNumber(
        nutrients.protein
      )}g`;

  }


  if (modalCarbs) {

    modalCarbs.innerHTML =
      `${formatNumber(
        nutrients.carbs
      )}g`;

  }


  if (modalFat) {

    modalFat.innerHTML =
      `${formatNumber(
        nutrients.fat
      )}g`;

  }


  if (modalSugar) {

    modalSugar.innerHTML =
      `${formatNumber(
        nutrients.sugar
      )}g`;

  }


  if (modalSaturatedFat) {

    modalSaturatedFat.innerHTML =
      `${formatNumber(
        nutrients.saturatedFat
      )}g`;

  }

  if (modalFiber) {

    modalFiber.innerHTML =
      `${formatNumber(
        nutrients.fiber
      )}g`;

  }


  if (modalSodium) {

    modalSodium.innerHTML =
      `${formatNumber(
        nutrients.sodium
      )}g`;

  }


  if (modalProductIngredients) {

    modalProductIngredients.innerHTML =
      product.ingredients ||
      "No ingredients information available.";

  }


  if (productDetailsModal) {

    productDetailsModal.classList.remove(
      "hidden"
    );

  }


  document.body.style.overflow =
    "hidden";

}


async function getProductDetailsByBarcode(barcode) {

  try {

    let response =
      await fetch(
        `https://nutriplan-api.vercel.app/api/products/barcode/${encodeURIComponent(barcode)}`
      );

    if (!response.ok) {

      throw new Error(
        "Product not found"
      );

    }

    let data =
      await response.json();

    if (!data.result) {

      throw new Error(
        "Product not found"
      );

    }

    displayProductDetails(
      data.result
    );

  } catch (error) {

    console.log(error);

    alert(
      "Could not load product details."
    );

  }

}

async function searchByBarcode() {

  if (
    !barcodeInput ||
    !lookupBarcodeBtn
  ) {

    return;

  }

  let barcode =
    barcodeInput.value.trim();

  if (barcode === "") {

    alert(
      "Please enter a barcode"
    );

    return;

  }

  try {

    lookupBarcodeBtn.disabled =
      true;

    lookupBarcodeBtn.innerHTML =
      `<i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading`;

    await getProductDetailsByBarcode(
      barcode
    );

  } finally {

    lookupBarcodeBtn.disabled =
      false;

    lookupBarcodeBtn.innerHTML =
      `<i class="fa-solid fa-search mr-2"></i>Lookup`;

  }

}


if (lookupBarcodeBtn) {

  lookupBarcodeBtn.addEventListener(
    "click",
    function () {

      searchByBarcode();

    }
  );

}

if (barcodeInput) {

  barcodeInput.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Enter") {

        searchByBarcode();

      }

    }
  );

}

function closeProductDetailsModal() {

  if (productDetailsModal) {

    productDetailsModal.classList.add(
      "hidden"
    );

  }

  document.body.style.overflow =
    "auto";

}

if (closeProductModal) {

  closeProductModal.addEventListener(
    "click",
    function () {

      closeProductDetailsModal();

    }
  );

}

if (modalCloseBtn) {

  modalCloseBtn.addEventListener(
    "click",
    function () {

      closeProductDetailsModal();

    }
  );

}


if (productDetailsModal) {

  productDetailsModal.addEventListener(
    "click",
    function (event) {

      if (
        event.target ===
        productDetailsModal
      ) {

        closeProductDetailsModal();

      }

    }
  );

}

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      productDetailsModal &&
      !productDetailsModal.classList.contains(
        "hidden"
      )
    ) {

      closeProductDetailsModal();

    }

  }
);
getCategories();

getAreas();

getMealsByCategory(
  "Seafood"
);

showInitialProductsState();


let logMealBtn =
  document.getElementById("log-meal-btn");

let logFoodBtn =
  document.getElementById("log-food-btn");

let foodlogDate =
  document.getElementById("foodlog-date");

let caloriesPercent =
  document.getElementById("calories-percent");

let caloriesProgress =
  document.getElementById("calories-progress");

let caloriesCurrent =
  document.getElementById("calories-current");

let proteinPercent =
  document.getElementById("protein-percent");

let proteinProgress =
  document.getElementById("protein-progress");

let proteinCurrent =
  document.getElementById("protein-current");

let carbsPercent =
  document.getElementById("carbs-percent");

let carbsProgress =
  document.getElementById("carbs-progress");

let carbsCurrent =
  document.getElementById("carbs-current");

let fatPercent =
  document.getElementById("fat-percent");

let fatProgress =
  document.getElementById("fat-progress");

let fatCurrent =
  document.getElementById("fat-current");

let loggedItemsCount =
  document.getElementById("logged-items-count");

let loggedItemsList =
  document.getElementById("logged-items-list");

let clearFoodlogBtn =
  document.getElementById("clear-foodlog");

let weeklyChart =
  document.getElementById("weekly-chart");

let weeklyAverage =
  document.getElementById("weekly-average");

let weeklyTotalItems =
  document.getElementById("weekly-total-items");

let daysOnGoal =
  document.getElementById("days-on-goal");


const FOOD_LOG_KEY =
  "nutriplan-food-log";

const DAILY_GOALS = {

  calories: 2000,

  protein: 50,

  carbs: 250,

  fat: 65

};


let currentProduct = null;

function getDateKey(date = new Date()) {

  let year =
    date.getFullYear();

  let month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  let day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;

}


function getFoodLogNumber(value) {

  let number =
    Number(value);

  if (!Number.isFinite(number)) {

    return 0;

  }

  return number;

}


function formatFoodLogNumber(value) {

  let number =
    getFoodLogNumber(value);

  return Number(
    number.toFixed(1)
  ).toString();

}

function getItemNutrients(item) {

  console.log(
    "EXTRACTING NUTRIENTS FROM:",
    item
  );

  item = item || {};


  let sources = [

    item.data?.perServing,
    item.data?.totals,
    item.data?.nutrients,
    item.data?.nutrition,

    item.perServing,
    item.totals,
    item.nutrients,
    item.nutrition,
    item.nutritionInfo,
    item.nutritionData,

    item.result?.perServing,
    item.result?.totals,
    item.result?.nutrients,
    item.result?.nutrition,

    item.data?.result?.perServing,
    item.data?.result?.totals,
    item.data?.result?.nutrients,

   
    item

  ];


  let finalNutrients = {

    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    fiber: 0,
    sodium: 0

  };


  for (
    let i = 0;
    i < sources.length;
    i++
  ) {

    let source =
      sources[i];


    if (!source) {

      continue;

    }


    let calories =
      getFoodLogNumber(

        source.calories ??
        source.calorie ??
        source.kcal ??
        source.energyKcal ??
        source.energy ??
        source["energy-kcal"] ??
        0

      );


    let protein =
      getFoodLogNumber(

        source.protein ??
        source.proteins ??
        source["proteins"] ??
        0

      );


    let carbs =
      getFoodLogNumber(

        source.carbs ??
        source.carbohydrates ??
        source.carbohydrate ??
        source["carbohydrates"] ??
        0

      );


    let fat =
      getFoodLogNumber(

        source.fat ??
        source.fats ??
        source.totalFat ??
        source["total-fat"] ??
        0

      );


    let sugar =
      getFoodLogNumber(

        source.sugar ??
        source.sugars ??
        source["sugars"] ??
        0

      );


    let fiber =
      getFoodLogNumber(

        source.fiber ??
        source.fibre ??
        source["fiber"] ??
        0

      );


    let sodium =
      getFoodLogNumber(

        source.sodium ??
        source["sodium"] ??
        0

      );


    let hasNutrition =

      calories > 0 ||

      protein > 0 ||

      carbs > 0 ||

      fat > 0;


    if (hasNutrition) {

      finalNutrients = {

        calories:
          calories,

        protein:
          protein,

        carbs:
          carbs,

        fat:
          fat,

        sugar:
          sugar,

        fiber:
          fiber,

        sodium:
          sodium

      };


      break;

    }

  }


  console.log(
    "FINAL EXTRACTED NUTRIENTS:",
    finalNutrients
  );


  return finalNutrients;

}

function getFoodLogData() {

  try {

    let savedData =
      localStorage.getItem(
        FOOD_LOG_KEY
      );

    return savedData
      ? JSON.parse(savedData)
      : {};

  } catch (error) {

    console.error(
      "Food log load error:",
      error
    );

    return {};

  }

}


function saveFoodLogData(data) {

  localStorage.setItem(
    FOOD_LOG_KEY,
    JSON.stringify(data)
  );

}


function getTodayFoodLog() {

  let allData =
    getFoodLogData();

  return allData[
    getDateKey()
  ] || [];

}


function saveTodayFoodLog(items) {

  let allData =
    getFoodLogData();

  allData[
    getDateKey()
  ] = items;

  saveFoodLogData(
    allData
  );

}

function getFoodLogProductImage(product) {

  if (
    product?.image &&
    typeof product.image === "string"
  ) {

    return product.image;

  }


  if (
    product?.image_url &&
    typeof product.image_url === "string"
  ) {

    return product.image_url;

  }


  if (
    product?.thumbnail &&
    typeof product.thumbnail === "string"
  ) {

    return product.thumbnail;

  }


  return "";

}



function createMealFoodItem(
  meal,
  servings = 1
) {

  let nutrients =
    getItemNutrients(
      meal.nutrients || meal
    );


  console.log(
    "CREATING MEAL FOOD ITEM:",
    meal
  );


  console.log(
    "USING NUTRIENTS:",
    nutrients
  );


  return {

    id:
      `meal-${
        meal.id ||
        meal.idMeal ||
        Date.now()
      }-${Date.now()}`,


    type:
      "meal",


    mealId:
      meal.id ||
      meal.idMeal ||
      "",


    name:
      meal.name ||
      meal.strMeal ||
      "Unknown Meal",


    image:

      meal.thumbnail ||

      meal.image ||

      meal.image_url ||

      meal.strMealThumb ||

      "",


    servings:
      servings,


    calories:

      nutrients.calories *
      servings,


    protein:

      nutrients.protein *
      servings,


    carbs:

      nutrients.carbs *
      servings,


    fat:

      nutrients.fat *
      servings,


    sugar:

      nutrients.sugar *
      servings,


    fiber:

      nutrients.fiber *
      servings,


    sodium:

      nutrients.sodium *
      servings,


    date:
      getDateKey(),


    createdAt:
      new Date().toISOString()

  };

}


function createProductFoodItem(
  product,
  servings = 1
) {

  let nutrients =
    getItemNutrients(
      product
    );


  return {

    id:
      `product-${
        product.barcode ||
        Date.now()
      }-${Date.now()}`,

    type:
      "product",

    barcode:
      product.barcode ||
      "",

    name:
      product.name ||
      "Unknown Product",

    image:
      getFoodLogProductImage(
        product
      ),

    servings:
      servings,

    calories:
      nutrients.calories *
      servings,

    protein:
      nutrients.protein *
      servings,

    carbs:
      nutrients.carbs *
      servings,

    fat:
      nutrients.fat *
      servings,

    sugar:
      nutrients.sugar *
      servings,

    fiber:
      nutrients.fiber *
      servings,

    sodium:
      nutrients.sodium *
      servings,

    date:
      getDateKey(),

    createdAt:
      new Date().toISOString()

  };

}


function addToFoodLog(item) {

  let todayItems =
    getTodayFoodLog();

  todayItems.push(
    item
  );

  saveTodayFoodLog(
    todayItems
  );

  renderFoodLog();

}


function addMealToFoodLog(
  meal,
  servings = 1
) {

  let item =
    createMealFoodItem(
      meal,
      servings
    );


  console.log(
    "MEAL BEING SAVED:",
    item
  );


  addToFoodLog(
    item
  );

}



function addProductToFoodLog(
  product,
  servings = 1
) {

  let item =
    createProductFoodItem(
      product,
      servings
    );


  console.log(
    "PRODUCT BEING SAVED:",
    item
  );


  addToFoodLog(
    item
  );

}


function calculateNutritionTotals(items) {

  let totals = {

    calories: 0,

    protein: 0,

    carbs: 0,

    fat: 0

  };


  for (
    let i = 0;
    i < items.length;
    i++
  ) {

    totals.calories +=
      getFoodLogNumber(
        items[i].calories
      );

    totals.protein +=
      getFoodLogNumber(
        items[i].protein
      );

    totals.carbs +=
      getFoodLogNumber(
        items[i].carbs
      );

    totals.fat +=
      getFoodLogNumber(
        items[i].fat
      );

  }


  return totals;

}


function getFoodLogPercentage(
  current,
  goal
) {

  if (!goal) {

    return 0;

  }

  return Math.round(
    current / goal * 100
  );

}


function getFoodLogProgressWidth(percent) {

  return Math.max(
    0,
    Math.min(
      percent,
      100
    )
  );

}


function updateTodayNutrition(items) {

  let totals =
    calculateNutritionTotals(
      items
    );


  let caloriesValue =
    getFoodLogPercentage(
      totals.calories,
      DAILY_GOALS.calories
    );


  let proteinValue =
    getFoodLogPercentage(
      totals.protein,
      DAILY_GOALS.protein
    );


  let carbsValue =
    getFoodLogPercentage(
      totals.carbs,
      DAILY_GOALS.carbs
    );


  let fatValue =
    getFoodLogPercentage(
      totals.fat,
      DAILY_GOALS.fat
    );


  if (caloriesPercent) {

    caloriesPercent.textContent =
      `${caloriesValue}%`;

  }


  if (caloriesProgress) {

    caloriesProgress.style.width =
      `${getFoodLogProgressWidth(
        caloriesValue
      )}%`;

  }


  if (caloriesCurrent) {

    caloriesCurrent.textContent =
      `${formatFoodLogNumber(
        totals.calories
      )} kcal`;

  }


  if (proteinPercent) {

    proteinPercent.textContent =
      `${proteinValue}%`;

  }


  if (proteinProgress) {

    proteinProgress.style.width =
      `${getFoodLogProgressWidth(
        proteinValue
      )}%`;

  }


  if (proteinCurrent) {

    proteinCurrent.textContent =
      `${formatFoodLogNumber(
        totals.protein
      )} g`;

  }


  if (carbsPercent) {

    carbsPercent.textContent =
      `${carbsValue}%`;

  }


  if (carbsProgress) {

    carbsProgress.style.width =
      `${getFoodLogProgressWidth(
        carbsValue
      )}%`;

  }


  if (carbsCurrent) {

    carbsCurrent.textContent =
      `${formatFoodLogNumber(
        totals.carbs
      )} g`;

  }


  if (fatPercent) {

    fatPercent.textContent =
      `${fatValue}%`;

  }


  if (fatProgress) {

    fatProgress.style.width =
      `${getFoodLogProgressWidth(
        fatValue
      )}%`;

  }


  if (fatCurrent) {

    fatCurrent.textContent =
      `${formatFoodLogNumber(
        totals.fat
      )} g`;

  }

}


function displayTodayFoodItems(items) {

  if (
    !loggedItemsList ||
    !loggedItemsCount
  ) {

    return;

  }


  loggedItemsCount.textContent =
    `Logged Items (${items.length})`;


  if (items.length === 0) {

    if (clearFoodlogBtn) {

      clearFoodlogBtn.classList.add(
        "hidden"
      );

    }


    loggedItemsList.innerHTML = `

      <div class="text-center py-10">

        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">

          <i class="fa-solid fa-utensils text-2xl text-gray-400"></i>

        </div>

        <p class="font-semibold text-gray-600 mb-1">

          No food logged today

        </p>

        <p class="text-sm text-gray-400">

          Start tracking your nutrition by logging meals or products

        </p>

      </div>

    `;

    return;

  }


  if (clearFoodlogBtn) {

    clearFoodlogBtn.classList.remove(
      "hidden"
    );

  }


  let cartona = "";


  for (
    let item of items
  ) {

    let itemIcon =
      item.type === "meal"
        ? "fa-utensils"
        : "fa-box";


    let itemType =
      item.type === "meal"
        ? "Meal"
        : "Product";


    cartona += `

      <div class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-3 transition-all">

        <div class="flex items-center gap-3">

          <div class="w-12 h-12 rounded-lg bg-white border border-gray-200 overflow-hidden flex-shrink-0">

            ${
              item.image

                ? `

                  <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="w-full h-full object-cover"
                  >

                `

                : `

                  <div class="w-full h-full flex items-center justify-center text-gray-400">

                    <i class="fa-solid ${itemIcon}"></i>

                  </div>

                `
            }

          </div>


          <div class="flex-1 min-w-0">

            <div class="flex items-center justify-between gap-3">

              <div class="min-w-0">

                <h4 class="font-semibold text-sm text-gray-800 truncate">

                  ${item.name}

                </h4>

                <p class="text-[10px] text-gray-400 mt-0.5">

                  ${itemType}
                  •
                  ${item.servings} Serving${item.servings > 1 ? "s" : ""}

                </p>

              </div>


              <button
                class="delete-food-item w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                data-id="${item.id}"
              >

                <i class="fa-solid fa-trash"></i>

              </button>

            </div>


            <div class="grid grid-cols-4 gap-2 mt-3">

              <div>

                <p class="text-[10px] text-gray-400">
                  Calories
                </p>

                <p class="text-xs font-bold text-emerald-600">
                  ${formatFoodLogNumber(item.calories)} kcal
                </p>

              </div>


              <div>

                <p class="text-[10px] text-gray-400">
                  Protein
                </p>

                <p class="text-xs font-bold text-blue-600">
                  ${formatFoodLogNumber(item.protein)}g
                </p>

              </div>


              <div>

                <p class="text-[10px] text-gray-400">
                  Carbs
                </p>

                <p class="text-xs font-bold text-amber-600">
                  ${formatFoodLogNumber(item.carbs)}g
                </p>

              </div>


              <div>

                <p class="text-[10px] text-gray-400">
                  Fat
                </p>

                <p class="text-xs font-bold text-purple-600">
                  ${formatFoodLogNumber(item.fat)}g
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    `;

  }


  loggedItemsList.innerHTML =
    cartona;

}


function deleteFoodItem(itemId) {

  let items =
    getTodayFoodLog();


  items =
    items.filter(
      item =>
        item.id !== itemId
    );


  saveTodayFoodLog(
    items
  );


  renderFoodLog();

}


if (loggedItemsList) {

  loggedItemsList.addEventListener(
    "click",
    function (event) {

      let target =
        event.target.closest(
          ".delete-food-item"
        );


      if (!target) {

        return;

      }


      deleteFoodItem(
        target.dataset.id
      );

    }
  );

}


function clearTodayFoodLog() {

  let allData =
    getFoodLogData();


  delete allData[
    getDateKey()
  ];


  saveFoodLogData(
    allData
  );


  renderFoodLog();

}


if (clearFoodlogBtn) {

  clearFoodlogBtn.addEventListener(
    "click",
    function () {

      Swal.fire({

        title:
          "Clear Today's Log?",

        text:
          "This will remove all logged food items for today.",

        icon:
          "warning",

        showCancelButton:
          true,

        confirmButtonText:
          "Yes, clear it!",

        cancelButtonText:
          "Cancel",

        confirmButtonColor:
          "#ef4444",

        cancelButtonColor:
          "#64748b",

        reverseButtons:
          true

      }).then(

        function (result) {

          if (
            result.isConfirmed
          ) {

            clearTodayFoodLog();


            Swal.fire({

              title:
                "Cleared!",

              text:
                "Today's food log has been cleared.",

              icon:
                "success",

              timer:
                1500,

              showConfirmButton:
                false

            });

          }

        }

      );

    }
  );

}


function getLast7Days() {

  let days = [];


  for (
    let i = 6;
    i >= 0;
    i--
  ) {

    let date =
      new Date();

    date.setDate(
      date.getDate() - i
    );

    days.push(
      date
    );

  }


  return days;

}


function displayWeeklyChart() {

  if (!weeklyChart) {

    return;

  }


  let allData =
    getFoodLogData();


  let days =
    getLast7Days();


  let cartona = "";


  for (
    let date of days
  ) {

    let dateKey =
      getDateKey(
        date
      );


    let items =
      allData[dateKey] || [];


    let totals =
      calculateNutritionTotals(
        items
      );


    let isToday =
      dateKey ===
      getDateKey();


    let dayName =
      date.toLocaleDateString(
        "en-US",
        {
          weekday: "short"
        }
      );


    let dayNumber =
      date.getDate();


    let calories =
      Math.round(
        totals.calories
      );


    let itemsText =
      `${items.length} Item${
        items.length !== 1
          ? "s"
          : ""
      }`;


    cartona += `

      <div
        class="
          flex
          flex-col
          items-center
          justify-center
          gap-1
          rounded-xl
          py-3
          px-2
          transition-all
          ${
            isToday
              ? "bg-indigo-100"
              : ""
          }
        "
      >


        <!-- DAY -->

        <p
          class="
            text-xs
            font-medium
            ${
              isToday
                ? "text-indigo-600"
                : "text-gray-500"
            }
          "
        >

          ${dayName}

        </p>


        <!-- DATE -->

        <p
          class="
            text-sm
            font-semibold
            text-gray-800
          "
        >

          ${dayNumber}

        </p>


        <!-- CALORIES -->

        <p
          class="
            text-lg
            font-bold
            ${
              calories > 0
                ? "text-emerald-600"
                : "text-gray-400"
            }
          "
        >

          ${calories}

        </p>


        <p
          class="
            text-[11px]
            text-gray-400
          "
        >

          kcal

        </p>


        <!-- ITEMS -->

        <p
          class="
            text-[10px]
            text-gray-500
            mt-1
          "
        >

          ${itemsText}

        </p>


      </div>

    `;

  }


  weeklyChart.innerHTML =
    cartona;

}


function updateWeeklyStats() {

  let allData =
    getFoodLogData();


  let days =
    getLast7Days();


  let totalCalories = 0;

  let totalItems = 0;

  let daysOnGoalCount = 0;


  for (
    let date of days
  ) {

    let items =
      allData[
        getDateKey(date)
      ] || [];


    let totals =
      calculateNutritionTotals(
        items
      );


    totalCalories +=
      totals.calories;


    totalItems +=
      items.length;


    if (

      totals.calories >=
      DAILY_GOALS.calories * 0.8

      &&

      totals.calories <=
      DAILY_GOALS.calories

    ) {

      daysOnGoalCount++;

    }

  }


  if (weeklyAverage) {

    weeklyAverage.textContent =
      `${formatFoodLogNumber(
        totalCalories / 7
      )} kcal`;

  }


  if (weeklyTotalItems) {

    weeklyTotalItems.textContent =
      `${totalItems} items`;

  }


  if (daysOnGoal) {

    daysOnGoal.textContent =
      `${daysOnGoalCount} / 7`;

  }

}


function formatFoodLogDate() {

  if (!foodlogDate) {

    return;

  }


  foodlogDate.textContent =
    new Date().toLocaleDateString(
      "en-US",
      {

        weekday: "long",

        month: "short",

        day: "numeric"

      }
    );

}



function renderFoodLog() {

  formatFoodLogDate();


  let todayItems =
    getTodayFoodLog();


  updateTodayNutrition(
    todayItems
  );


  displayTodayFoodItems(
    todayItems
  );


  displayWeeklyChart();


  updateWeeklyStats();

}



function openMealLogModal(meal) {

  if (!meal) {

    return;

  }


  console.log(
    "OPENING MEAL MODAL WITH:",
    meal
  );

  let nutrients =
    getItemNutrients(
      meal.nutrients || meal
    );


  console.log(
    "MEAL NUTRIENTS:",
    nutrients
  );


  let hasNutrition =

    nutrients.calories > 0 ||

    nutrients.protein > 0 ||

    nutrients.carbs > 0 ||

    nutrients.fat > 0;


  if (!hasNutrition) {

    Swal.fire({

      title:
        "Nutrition Not Available",

      text:
        "Nutrition information could not be loaded for this meal.",

      icon:
        "warning"

    });

    return;

  }

  Swal.fire({

    title:
      "Log This Meal",


    html: `

      <div class="text-left">


        <!-- MEAL IMAGE -->

        ${

          (

            meal.thumbnail ||

            meal.image ||

            meal.strMealThumb

          )

            ? `

              <div class="flex justify-center mb-4">

                <img
                  src="${
                    meal.thumbnail ||
                    meal.image ||
                    meal.strMealThumb
                  }"

                  alt="${
                    meal.name ||
                    meal.strMeal ||
                    "Meal"
                  }"

                  class="w-20 h-20 object-cover rounded-xl shadow"
                >

              </div>

            `

            : ""

        }


        <!-- MEAL NAME -->

        <h3
          class="text-lg font-bold text-gray-900 text-center mb-6"
        >

          ${
            meal.name ||
            meal.strMeal ||
            "Unknown Meal"
          }

        </h3>


        <!-- SERVINGS -->

        <label
          class="block text-sm font-semibold text-gray-700 mb-2"
        >

          Number of Servings

        </label>


        <input

          id="swal-meal-servings"

          type="number"

          min="1"

          step="1"

          value="1"

          class="swal2-input"

          style="
            width:100%;
            margin:0 0 20px 0;
            box-sizing:border-box;
          "

        >


        <!-- NUTRITION -->

        <div
          class="grid grid-cols-2 gap-3 text-center"
        >


          <!-- CALORIES -->

          <div
            class="bg-orange-50 rounded-xl p-3"
          >

            <p

              id="swal-meal-calories"

              class="text-xl font-bold text-orange-600"

            >

              ${formatFoodLogNumber(
                nutrients.calories
              )}

            </p>

            <p
              class="text-xs text-gray-500"
            >

              Calories

            </p>

          </div>


          <!-- PROTEIN -->

          <div
            class="bg-blue-50 rounded-xl p-3"
          >

            <p

              id="swal-meal-protein"

              class="text-xl font-bold text-blue-600"

            >

              ${formatFoodLogNumber(
                nutrients.protein
              )}g

            </p>

            <p
              class="text-xs text-gray-500"
            >

              Protein

            </p>

          </div>


          <!-- CARBS -->

          <div
            class="bg-amber-50 rounded-xl p-3"
          >

            <p

              id="swal-meal-carbs"

              class="text-xl font-bold text-amber-600"

            >

              ${formatFoodLogNumber(
                nutrients.carbs
              )}g

            </p>

            <p
              class="text-xs text-gray-500"
            >

              Carbs

            </p>

          </div>


          <!-- FAT -->

          <div
            class="bg-purple-50 rounded-xl p-3"
          >

            <p

              id="swal-meal-fat"

              class="text-xl font-bold text-purple-600"

            >

              ${formatFoodLogNumber(
                nutrients.fat
              )}g

            </p>

            <p
              class="text-xs text-gray-500"
            >

              Fat

            </p>

          </div>


        </div>

      </div>

    `,


    showCancelButton:
      true,


    confirmButtonText:
      "Log Meal",


    cancelButtonText:
      "Cancel",


    confirmButtonColor:
      "#059669",


    cancelButtonColor:
      "#6B7280",



    didOpen:
      function () {

        let servingsInput =
          document.getElementById(
            "swal-meal-servings"
          );


        let caloriesElement =
          document.getElementById(
            "swal-meal-calories"
          );


        let proteinElement =
          document.getElementById(
            "swal-meal-protein"
          );


        let carbsElement =
          document.getElementById(
            "swal-meal-carbs"
          );


        let fatElement =
          document.getElementById(
            "swal-meal-fat"
          );


        if (!servingsInput) {

          return;

        }


        servingsInput.addEventListener(

          "input",

          function () {

            let servings =
              Number(
                servingsInput.value
              );


            if (

              !Number.isFinite(
                servings
              )

              ||

              servings <= 0

            ) {

              servings = 1;

            }


            if (caloriesElement) {

              caloriesElement.textContent =
                formatFoodLogNumber(

                  nutrients.calories *
                  servings

                );

            }


            if (proteinElement) {

              proteinElement.textContent =
                `${formatFoodLogNumber(

                  nutrients.protein *
                  servings

                )}g`;

            }


            if (carbsElement) {

              carbsElement.textContent =
                `${formatFoodLogNumber(

                  nutrients.carbs *
                  servings

                )}g`;

            }


            if (fatElement) {

              fatElement.textContent =
                `${formatFoodLogNumber(

                  nutrients.fat *
                  servings

                )}g`;

            }

          }

        );

      },


    preConfirm:
      function () {

        let servingsInput =
          document.getElementById(
            "swal-meal-servings"
          );


        if (!servingsInput) {

          return false;

        }


        let servings =
          Number(
            servingsInput.value
          );


        if (

          !Number.isFinite(
            servings
          )

          ||

          servings <= 0

        ) {

          Swal.showValidationMessage(

            "Please enter a valid number of servings"

          );

          return false;

        }


        return servings;

      }

  }).then(

    function (result) {


      if (!result.isConfirmed) {

        return;

      }

      let item =
        createMealFoodItem(

          meal,

          result.value

        );


      addToFoodLog(
        item
      );


      console.log(
        "MEAL ADDED:",
        item
      );


      Swal.fire({

        title:
          "Meal Added",

        text:
          "The meal was added to your food log.",

        icon:
          "success"

      });

    }

  );

}


function openProductLogModal(product) {

  if (!product) {

    return;

  }


  let nutrients =
    getItemNutrients(
      product
    );


  Swal.fire({

    title:
      "Log This Food",


    html: `

      <div class="text-left">

        ${
          getFoodLogProductImage(product)

            ? `

              <div class="flex justify-center mb-4">

                <img
                  src="${getFoodLogProductImage(product)}"
                  class="w-20 h-20 object-cover rounded-xl shadow"
                >

              </div>

            `

            : ""
        }


        <h3 class="text-lg font-bold text-center mb-2">

          ${product.name || "Unknown Product"}

        </h3>


        <p class="text-sm text-gray-500 text-center mb-6">

          ${product.brand || ""}

        </p>


        <label class="block text-sm font-semibold text-gray-700 mb-2">

          Number of Servings

        </label>


        <input
          id="swal-food-servings"
          type="number"
          min="0.1"
          step="0.5"
          value="1"
          class="swal2-input"
          style="width:100%;margin:0 0 20px 0;box-sizing:border-box;"
        >


        <div class="grid grid-cols-2 gap-3 text-center">

          <div class="bg-orange-50 rounded-xl p-3">

            <p
              id="swal-product-calories"
              class="text-xl font-bold text-orange-600"
            >
              ${formatFoodLogNumber(nutrients.calories)}
            </p>

            <p class="text-xs text-gray-500">
              Calories
            </p>

          </div>


          <div class="bg-blue-50 rounded-xl p-3">

            <p
              id="swal-product-protein"
              class="text-xl font-bold text-blue-600"
            >
              ${formatFoodLogNumber(nutrients.protein)}g
            </p>

            <p class="text-xs text-gray-500">
              Protein
            </p>

          </div>


          <div class="bg-amber-50 rounded-xl p-3">

            <p
              id="swal-product-carbs"
              class="text-xl font-bold text-amber-600"
            >
              ${formatFoodLogNumber(nutrients.carbs)}g
            </p>

            <p class="text-xs text-gray-500">
              Carbs
            </p>

          </div>


          <div class="bg-purple-50 rounded-xl p-3">

            <p
              id="swal-product-fat"
              class="text-xl font-bold text-purple-600"
            >
              ${formatFoodLogNumber(nutrients.fat)}g
            </p>

            <p class="text-xs text-gray-500">
              Fat
            </p>

          </div>

        </div>

      </div>

    `,


    showCancelButton:
      true,

    confirmButtonText:
      "Log Food",

    cancelButtonText:
      "Cancel",

    confirmButtonColor:
      "#2563EB",


    didOpen:
      function () {

        let servingsInput =
          document.getElementById(
            "swal-food-servings"
          );


        servingsInput.addEventListener(
          "input",
          function () {

            let servings =
              Number(
                servingsInput.value
              );


            if (
              !Number.isFinite(servings) ||
              servings <= 0
            ) {

              servings = 1;

            }


            document.getElementById(
              "swal-product-calories"
            ).textContent =
              formatFoodLogNumber(
                nutrients.calories * servings
              );


            document.getElementById(
              "swal-product-protein"
            ).textContent =
              `${formatFoodLogNumber(
                nutrients.protein * servings
              )}g`;


            document.getElementById(
              "swal-product-carbs"
            ).textContent =
              `${formatFoodLogNumber(
                nutrients.carbs * servings
              )}g`;


            document.getElementById(
              "swal-product-fat"
            ).textContent =
              `${formatFoodLogNumber(
                nutrients.fat * servings
              )}g`;

          }
        );

      },


    preConfirm:
      function () {

        let input =
          document.getElementById(
            "swal-food-servings"
          );


        let servings =
          Number(
            input.value
          );


        if (
          !Number.isFinite(servings) ||
          servings <= 0
        ) {

          Swal.showValidationMessage(
            "Please enter a valid number of servings"
          );

          return false;

        }


        return servings;

      }

  }).then(

    function (result) {

      if (!result.isConfirmed) {

        return;

      }


      addProductToFoodLog(
        product,
        result.value
      );


      if (
        typeof closeProductDetailsModal ===
        "function"
      ) {

        closeProductDetailsModal();

      }


      Swal.fire({

        title:
          "Food Added",

        text:
          "The product was added to your food log.",

        icon:
          "success"

      });

    }

  );

}


if (logMealBtn) {

  logMealBtn.addEventListener(
    "click",
    function () {

      if (!currentMeal) {

        Swal.fire({

          title:
            "No Meal Selected",

          text:
            "Please select a meal first.",

          icon:
            "warning"

        });

        return;

      }


      openMealLogModal(
        currentMeal
      );

    }
  );

}




if (logFoodBtn) {

  logFoodBtn.addEventListener(
    "click",
    function () {

      // ==========================================
      // CHECK PRODUCT
      // ==========================================

      if (!currentProduct) {

        Swal.fire({

          title:
            "No Product Selected",

          text:
            "Please select a product first.",

          icon:
            "warning"

        });

        return;

      }

      addProductToFoodLog(
        currentProduct,
        1
      );

      closeProductDetailsModal();


      Swal.fire({

        title:
          "Food Added",

        text:
          "The product was added to your food log.",

        icon:
          "success",

        timer:
          1500,

        showConfirmButton:
          false

      });

    }
  );

}


renderFoodLog();

document.addEventListener("DOMContentLoaded", () => {


  const searchFiltersSection = document.getElementById(
    "search-filters-section"
  );

  const mealCategoriesSection = document.getElementById(
    "meal-categories-section"
  );

  const allRecipesSection = document.getElementById(
    "all-recipes-section"
  );

  const mealDetailsSection = document.getElementById(
    "meal-details"
  );

  const productsSection = document.getElementById(
    "products-section"
  );

  const foodlogSection = document.getElementById(
    "foodlog-section"
  );

  const navLinks = document.querySelectorAll(".nav-link");

  function hideAllSections() {
    searchFiltersSection?.classList.add("hidden");
    mealCategoriesSection?.classList.add("hidden");
    allRecipesSection?.classList.add("hidden");
    mealDetailsSection?.classList.add("hidden");
    productsSection?.classList.add("hidden");
    foodlogSection?.classList.add("hidden");
  }

  function setActiveLink(activeIndex) {
    navLinks.forEach((link, index) => {

      link.classList.remove(
        "bg-emerald-50",
        "text-emerald-700"
      );

      link.classList.add("text-gray-600");

      if (index === activeIndex) {
        link.classList.remove("text-gray-600");

        link.classList.add(
          "bg-emerald-50",
          "text-emerald-700"
        );
      }
    });
  }

  function showMeals() {

    hideAllSections();

    searchFiltersSection?.classList.remove("hidden");
    mealCategoriesSection?.classList.remove("hidden");
    allRecipesSection?.classList.remove("hidden");

    setActiveLink(0);
  }

  function showProducts() {

    hideAllSections();

    productsSection?.classList.remove("hidden");

    setActiveLink(1);
  }

  function showFoodLog() {

    hideAllSections();

    foodlogSection?.classList.remove("hidden");

    setActiveLink(2);
  }

  function handleRoute() {

    const hash = window.location.hash.toLowerCase();

    switch (hash) {

      case "#products":
        showProducts();
        break;

      case "#foodlog":
        showFoodLog();
        break;

      case "#meals":
      default:
        showMeals();

        if (!hash) {
          history.replaceState(null, "", "#meals");
        }

        break;
    }
  }
  navLinks.forEach((link, index) => {

    link.addEventListener("click", (e) => {

      e.preventDefault();

      if (index === 0) {

        window.location.hash = "meals";

      } else if (index === 1) {

        window.location.hash = "products";

      } else if (index === 2) {

        window.location.hash = "foodlog";

      }

    });

  });
  window.addEventListener("hashchange", handleRoute);
  handleRoute();

});