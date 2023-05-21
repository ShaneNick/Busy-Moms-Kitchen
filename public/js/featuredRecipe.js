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
  const summaryHtml = summaryList.slice(0, -1).map(item => `<ol>${item}</ol>`).join("");

  recipeOfTheDay.innerHTML = `
    <h2 id="recipe-title">${recipe.title}</h2>
    <div id="recipe-summary-container">
      <ul id="summary-html">${summaryHtml}</ul>
    </div>
    <img id="recipe-image" src="${recipe.image}" alt="${recipe.title}">
    <div id="recipe-instructions-container">
      <p id="recipe-instructions">${recipe.instructions}</p>
    </div>
  `;
}

