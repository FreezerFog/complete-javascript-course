import * as model from './model.js';
import recipeView from './views/recipeView.js';
import addRecipeView from './views/addRecipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
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
  try {
    const id = getRecipeHash();
    if (!id) return;
    recipeView.renderSpinner();
    // Updates bookmarks view
    bookmarksView.update(model.state.bookmarks);
    // Update results view to mark selected recipe
    resultsView.update(model.getSearchResultsPage());
    // Loads recipe
    await model.loadRecipe(id);
    // Renders recipe
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

function controlServings(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2) Update recipe view
  recipeView.update(model.state.recipe);
  // 3) Render bookmarks view
  bookmarksView.render(model.state.bookmarks);
}

function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

function controlAddRecipe(newRecipe) {
  console.log(newRecipe);
  // Upload new recipe data to model
}

function init() {
  // Publisher Subscriber Pattern
  // Allows for separation of business logic (controller) and presentation logic (views)
  // Subscibers located in controller
  // Publishers located in views (methods with 'addHandler' prefix are the publishers)
  // The appropriate controller method is passed to each view as needed
  // Code below sets up the subscriber relationship with each view's publisher as soon as the program is started. Common to do this in an 'init()' function
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();
