import { API_URL } from './config';
import { RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

export async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      setRecipeBookmark(true);
    else setRecipeBookmark(false);
  } catch (err) {
    throw err;
  }
}

export async function loadSearchResults(query) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
}

export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9;
  return state.search.results.slice(start, end);
}

export function updateServings(newServings) {
  // MY WAY - Copy piece of state, mutate copy, then replace state piece with copy
  const newRecipe = JSON.parse(JSON.stringify(state.recipe));
  newRecipe.ingredients.map(
    ing => (ing.quantity = (ing.quantity * newServings) / newRecipe.servings)
  );
  newRecipe.servings = newServings;
  state.recipe = newRecipe;

  // JONAS WAY - Has side effects
  // state.recipe.ingredients.forEach(ingredient => {
  //   ingredient.quantity =
  //     (ingredient.quantity * newServings) / state.recipe.servings;
  //   // newQuan
  // });
  // state.recipe.servings = newServings;
}

function persistBookmarks() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export function addBookmark(recipe) {
  state.bookmarks.push(recipe);
  setRecipeBookmark(true);
  persistBookmarks();
}

export function deleteBookmark(id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  setRecipeBookmark(false);
  persistBookmarks();
}

function setRecipeBookmark(bool) {
  state.recipe.bookmarked = bool;
}

function init() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
}
init();

// TODO: Remove prior to push to production
// // For clearing bookmarks during app development
// function clearBookmarks() {
//   localStorage.clear('bookmarks');
// }
// clearBookmarks();
