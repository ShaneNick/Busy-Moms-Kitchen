const searchBtn = document.getElementById('search-Bar');
const mealList = document.getElementById('meal');
const mealInformation = document.querySelector('.meal-details-content');
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
        data.meals.forEach(meal => {
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
        mealList.innerHTML = html;
        // Attach event listener to each "Get Recipe" button
        document.querySelectorAll('.recipeBtn').forEach(btn => {
          console.log('hishane');
          btn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link click action
            let mealItem = event.target.parentElement.parentElement;
            fetchMealDetails(mealItem.dataset.id);
          });
        });
      } else{
        html = "Sorry, we couldn't find any meals";
        mealList.classList.add('notFound');
        mealList.innerHTML = html;
      }
    });
}

// Function to fetch meal details
function fetchMealDetails(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(console.log('hishaney'))
    .then(response => response.json())
    .then(data => {
      let meal = data.meals[0];
      let html = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <ul>`;
      for (let i = 1; i <= 20; i++) {
        let ingredient = meal['strIngredient' + i];
        let measure = meal['strMeasure' + i];
        if (ingredient != null && ingredient != "" && measure != null && measure != "") {
          html += `<li>${measure} ${ingredient}</li>`;
          console.log('peekaboo');
        }
      }
      html += `</ul>`;
      console.log('Meal Information Element: ', mealInformation);
mealInformation.innerHTML = html;

      mealInformation.innerHTML = html;
    })
    .catch(err => console.error(err));
}

