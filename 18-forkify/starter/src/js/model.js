import { API_URL, KEY } from './config';
import { RESULTS_PER_PAGE } from './config';
import { AJAX } from './helpers';

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

function createRecipeObject(data) {
  const { recipe } = data.data;
  // recipe.key is conditionally added using ... spread operator
  // ... Returns nothing OR an object with an object ready key:value pair
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
}

export async function loadRecipe(id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

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
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
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

export async function uploadRecipe(newRecipe) {
  try {
    // 1) Turn newRecipe data into format that API will accept
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error('Wrong ingredient format! Please use correct format');
        const [quantity, unit, description] = ing[1]
          .replaceAll(' ', '')
          .split(',');
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // 2) Submit formatted data to API for posting
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
}

// For clearing bookmarks during app development
// function clearBookmarks() {
//   localStorage.clear('bookmarks');
// }
// clearBookmarks();

function init() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
}
init();
