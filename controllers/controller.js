const Model = require('./model.js');
const View = require('./view.js');

document.addEventListener('DOMContentLoaded', function() {
  const searchBtn = document.getElementById('search-Bar');
  const mealList = document.getElementById('meal');
  const mealInformation = document.querySelector('.meal-details-content');
  const recipeCloseBtn = document.getElementById('recipe-close-btn');

  searchBtn.addEventListener('click', async () => {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    const meals = await Model.getMealList(searchInputTxt);
    mealList.innerHTML = View.renderMealList(meals);
    attachGetRecipeEvent();
  });

  function attachGetRecipeEvent() {
    document.querySelectorAll('.recipeBtn').forEach(btn => {
      btn.addEventListener('click', async function (event) {
        event.preventDefault();
        let mealItem = event.target.parentElement.parentElement;
        const mealDetails = await Model.fetchMealDetails(mealItem.dataset.id);
        mealInformation.innerHTML = View.renderMealDetails(mealDetails);
      });
    });
  }
});
