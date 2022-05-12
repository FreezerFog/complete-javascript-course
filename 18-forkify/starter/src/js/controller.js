import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Parcel - Enables hot reloading of page during development
// if (module.hot) {
//   module.hot.accept();
// }

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
    resultsView.render(model.getSearchResultsPage());
    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(error);
  }
}

function controlPagination(goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
}

function init() {
  // Publisher Subscriber Pattern
  // Allows for separation of business logic (controller) and presentation logic (views)
  // Subscibers located in controller
  // Publishers located in views (methods with 'addHandler' prefix are the publishers)
  // The appropriate controller method is passed to each view as needed
  // Code below sets up the subscriber relationship with each view's publisher as soon as the program is started. Common to do this in an 'init()' function
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();
