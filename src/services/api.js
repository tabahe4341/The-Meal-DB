const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

async function request(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

export async function searchMealsByName(query = '') {
  const data = await request(`/search.php?s=${encodeURIComponent(query)}`);
  return data.meals ?? [];
}

export async function searchMealsByIngredient(ingredient) {
  const data = await request(`/filter.php?i=${encodeURIComponent(ingredient)}`);
  return data.meals ?? [];
}

export async function getCategories() {
  const data = await request('/categories.php');
  return data.categories ?? [];
}

export async function getMealsByCategory(category) {
  const data = await request(`/filter.php?c=${encodeURIComponent(category)}`);
  return data.meals ?? [];
}

export async function getMealById(id) {
  const data = await request(`/lookup.php?i=${encodeURIComponent(id)}`);
  return data.meals?.[0] ?? null;
}

export async function getRandomMeal() {
  const data = await request('/random.php');
  return data.meals?.[0] ?? null;
}
