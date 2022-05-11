import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Parcel - Enables hot reloading of page during development
if (module.hot) {
  module.hot.accept();
}

////// FUNCTIONS //////
function getRecipeHash() {
  return window.location.hash.slice(1);
}

async function controlRecipes() {
  const id = getRecipeHash();
  if (!id) return;
  recipeView.renderSpinner();

  try {
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    resultsView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // Load search results
    await model.loadSearchResults(query);
    // Render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(error);
  }
}

function init() {
  // Subscriber
  // Necessary for Publisher Subscriber pattern
  // On init(), controlRecipes() is passed to view's addHandlerRender() as argument
  // The view will use controlRecipes() inside the view
  // Business logic controlRecipes() stays in controller, while the view handles events & rendering
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();
