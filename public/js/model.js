export async function getMealList(searchInputTxt) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);
    const data = await response.json();
    return data.meals;
  }
  
  export async function fetchMealDetails(mealId) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    return data.meals[0];
  }
  