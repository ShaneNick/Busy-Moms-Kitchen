const form = document.querySelector('form');
const apiKey = "8eaad0a5d1f7418493824951d345fe76";
const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;
const recipeOfTheDay = document.getElementById("recipeOfTheDay");
const getRecipeButton = document.getElementById("getRecipeButton");
const closeButton = document.getElementById("closeButton");

getRecipeButton.addEventListener('click', () => {
  const lastFetchTime = localStorage.getItem("lastFetchTime");

  // Show the close button as soon as the getRecipeButton is clicked
  closeButton.style.display = "inline-block";

  if (!lastFetchTime || (Date.now() - lastFetchTime > 24 * 60 * 60 * 1000)) {
    fetchRecipe();
  } else {
    displayRecipe(JSON.parse(localStorage.getItem("recipe")));
  }
});

closeButton.addEventListener("click", function() {
  recipeOfTheDay.style.display = "none";
  closeButton.style.display = "none"; // Hide the close button
});




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
  const summaryHtml = summaryList.slice(0, -1).map(item => `<li>${item}.</li>`).join("");

  const instructionsList = recipe.instructions.split(". ");
  const instructionsHtml = instructionsList.slice(0, -1).map(item => `<li>${item}.</li>`).join("");

  recipeOfTheDay.innerHTML = `
    <div id="title-container">
      <h1 id="featuredtitle">Recipe Of The Day</h1>
      <h2 id="recipe-title">${recipe.title}</h2>
    </div>
    <div id="recipe-summary-container">
      <ul id="summary-html">${summaryHtml}</ul>
    </div>
    <img id="recipe-image" src="${recipe.image}" alt="${recipe.title}">
    <div id="recipe-instructions-container">
      <ol id="recipe-instructions">${instructionsHtml}</ol>
    </div>
  `;

  // Make the #recipeOfTheDay div visible
  recipeOfTheDay.style.display = "flex";
}
