import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

function init() {
  // Subscriber
  // Necessary for Publisher Subscriber pattern
  // On init(), controlRecipes() is passed to view's addHandlerRender() as argument
  // The view will use controlRecipes() inside the view
  // Business logic controlRecipes() stays in controller, while the view handles events & rendering
  recipeView.addHandlerRender(controlRecipes);
}

init();
