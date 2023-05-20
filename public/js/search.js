const searchBtn = document.getElementById('search-Bar');
const mealList = document.getElementById('meal');
const mealInformation = document.querySelector('meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener('click', getMealList);

function getMealList(){
  let searchInputTxt = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .catch(err => console.error(err))
    .then(data => {
      let html ="";
      if(data.meals){
        data.meals.forEach(meal=> {
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
      } else{
        html = "Sorry, we couldn't find any meals";
        mealList.classList.add(`notFound`);
      }
      mealList.innerHTML =html;
    });
}
