const searchBtn = document.getElementById('search-Bar')
const mealList = document.getElementById('meal')
const mealInformation = document.querySelector('meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn')

searchBtn.addEventListener('click', getMealList);

function getMealList(){
  let searchInputTxt = document.getElementById
  ('search-input').value.trim();
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
	.then(response => response.json())
  .catch(err => console.error(err))
	.then(data => {
    let html =""
    console.log(data);
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
  
//BEGINNING OF FEATURED RECIPE SECTION---------------------------
//Checking to see if more than 4 hrs 
const form = document.querySelector('form');
const apiKey = "8eaad0a5d1f7418493824951d345fe76";
const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;
const recipeOfTheDay = document.getElementById("recipeOfTheDay");
const lastFetchTime = localStorage.getItem("lastFetchTime");


if (!lastFetchTime || (Date.now() - lastFetchTime > 24 * 60 * 60 * 1000)) {
  fetchRecipe();
} else {
  displayRecipe(JSON.parse(localStorage.getItem("recipe")));
}

//Calls on new recipe from api
function fetchRecipe() {
  fetch(apiUrl)
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => {
      const recipe = data.recipes[0];
      localStorage.setItem("recipe", JSON.stringify(recipe));
      localStorage.setItem("lastFetchTime", Date.now());
      displayRecipe(recipe);
    })
    .catch(error => console.error(`Unable to fetch recipe: ${error.message}`));
}


function displayRecipe(recipe) {
  const summaryList = recipe.summary.split(". ");
  
  const summaryHtml = summaryList.slice(0, -1).map(item => `<li>${item}</li>`).join("");

 recipeOfTheDay.innerHTML = `

      <h2 id="recipe-title">${recipe.title}</h2>
      <img id ="recipe-image"src="${recipe.image}" alt="${recipe.title}">
      <ul id="summary-html">${summaryHtml}</ul>
      <p id="recipe-instructions">${recipe.instructions}</p>
  `;
}


//BEGINNING OF CONTACT SECTION----------------------------------
function submitForm(event) {
  event.preventDefault(); // prevent the form from submitting normally
  var data = {
    name: document.querySelector('#newsletter-form [name="name"]').value,
    email: document.querySelector('#newsletter-form [name="mail"]').value,
  };
  
  if (!data.email.includes("@")) {
    var errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = "Not a valid email address.";
    return;
  }
 
  //localStorage.setItem('Data', JSON.stringify(data)); 

  var values = JSON.parse(localStorage.getItem('Data') || '[]');
  values.push(data);

  }





