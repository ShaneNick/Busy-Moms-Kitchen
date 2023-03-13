const searchBtn = document.getElementById('search-Bar')
const mealList = document.getElementById('meal')
const mealInformation = document.querySelector('meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn')

searchBtn.addEventListener('click', getMealList);

function getMealList(){
  let searchInputTxt = document.getElementById
  ('search-input').value.trim();
  console.log(searchInputTxt);
}
/*const searchForm = document.querySelector('.search-container');
const searchInput = searchForm.querySelector('input');
const cardContainer = document.querySelector('.card-container');

searchForm.addEventListener('submit', e => {
  e.preventDefault()});
  
  const searchedFood = searchInput.value;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c738b8e630msh46d9946134aa62fp15873bjsnf8b31cb51c1d',
      'X-RapidAPI-Host': 'webknox-recipes.p.rapidapi.com'
    }
  };
  
  fetch('https://webknox-recipes.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

function displayResults(results) {
  cardContainer.innerHTML = '';
  
  results.forEach(result => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipeCard');
    
    const recipeTitle = document.createElement('h3');
    recipeTitle.textContent = result.title;
    
    const recipeImage = document.createElement('img');
    recipeImage.src = result.image;
    
    const recipeSummary = document.createElement('p');
    recipeSummary.textContent = result.summary;
    
    recipeCard.appendChild(recipeTitle);
    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeSummary);
    
    cardContainer.appendChild(recipeCard);
  });
}*/

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

//displays all recipe info within aside 
function displayRecipe(recipe) {
  recipeOfTheDay.innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}">
    <p>${recipe.summary}</p>
    <p>${recipe.instructions}</p>
  `;
}

//BEGINNING OF CONTACT SECTION----------------------------------
function submitForm(event) {
  event.preventDefault(); // prevent the form from submitting normally
  var data = {
    name: document.querySelector('#newsletter-form [name="name"]').value,
    email: document.querySelector('#newsletter-form [name="mail"]').value,
  };
  
  if (!email.includes("@")) {
    var errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = "Not a valid email address.";
    return;
  }

  if(mail.value){

  }
  localStorage.setItem('newsletterData', JSON.stringify(data)); // save the data to local storage
  document.getElementById("newsletter-form").reset(); // reset the form

  
}


