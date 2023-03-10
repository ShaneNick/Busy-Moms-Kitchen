const search = document.getElementById('search');
const featureRecipe = document.getElementById('featureRecipe');
const foodList = document.getElementById('foodList');
const form = document.querySelector('form');


//Will fetch data from Spoonacular
const API_KEY = '8eaad0a5d1f7418493824951d345fe76';
const SEARCH_ENDPOINT = 'https://api.spoonacular.com/recipes/complexSearch';



//WebKnox, provides Recipe Cards
const options = {
	method: 'POST',
	headers: {
		'X-RapidAPI-Key': 'c738b8e630msh46d9946134aa62fp15873bjsnf8b31cb51c1d',
		'X-RapidAPI-Host': 'webknox-recipes.p.rapidapi.com'
	},
};

/*fetch('https://webknox-recipes.p.rapidapi.com/recipes/visualizeRecipe', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


function getFoodList(){
    let searchInputTxt = document.getElementById('search-input').ariaValueMax.trim();
}*/

/*fetch('https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert')
.then((data) => {return data.json()});*/

let display;

/*fetch('https://api.spoonacular.com/recipes/random?apiKey=8eaad0a5d1f7418493824951d345fe76')
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          display(data, recipeOfTheDay);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to find a meal');
	 
    });*/
	
function displayRecipe(recipe) {
  // Get the HTML element where the recipe data will be displayed
  var recipeOfTheDay = document.getElementById("aside");

  // Create the recipe data HTML elements
  var recipeName = document.createElement("h2");
  recipeName.innerText = recipe.title;
  var recipeImage = document.createElement("img");
  recipeImage.src = recipe.image;
  recipeImage.alt = recipe.title;
  var recipeSummary = document.createElement("p");
  recipeSummary.innerHTML = recipe.summary;
  var recipeInstructions = document.createElement("p");
  recipeInstructions.innerHTML = recipe.instructions;

  // Append the recipe data elements to the HTML container
  recipeOfTheDay.appendChild(recipeName);
  recipeOfTheDay.appendChild(recipeImage);
  recipeOfTheDay.appendChild(recipeSummary);
  recipeOfTheDay.appendChild(recipeInstructions);
}

var apiKey = "8eaad0a5d1f7418493824951d345fe76";
var apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;
fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      // Convert the response to JSON format
      response.json().then(function(data) {
        // Call the display function with the recipe data
        displayRecipe(data.recipes[0]);
      });
    } else {
      // Handle error if API request fails
      console.log("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    // Handle error if fetch request fails
    console.log("Unable to fetch recipe: " + error.message);
  });