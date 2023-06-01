 const searchBtn = document.getElementById('search-Bar');
const mealList = document.getElementById('meal');
const mealInformation = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener('click', getMealList);

 function renderMealList(meals) {
    let html = "";
    if (meals) {
      meals.forEach(meal => {
        html += `
          <div class = "mealItem" data-id = "${meal.idMeal}">
            <div class = "meal-img">
              <img src =  "${meal.strMealThumb}" alt = "food">
            </div>
            <div class ="mealName">
              <h3>${meal.strMeal}</h3>
              <a href = "#" class = "recipeBtn">Get Recipe</a>
            </div>
          </div>`;
      });
    } else {
      html = "Sorry, we couldn't find any meals";
    }
    return html;
  }
  
   function renderMealDetails(meal) {
    let html = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <ul>`;
    for (let i = 1; i <= 20; i++) {
      let ingredient = meal['strIngredient' + i];
      let measure = meal['strMeasure' + i];
      if (ingredient != null && ingredient != "" && measure != null && measure != "") {
        html += `<li>${measure} ${ingredient}</li>`;
      }
    }
    html += `</ul>`;
    return html;
  }
  