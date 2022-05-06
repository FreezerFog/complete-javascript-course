///////////////////////////////////////////////////////////
// VIDEO279: Configuring Babel & Polyfilling

// Parcel uses Babel by default for code transpiling
// Babel is used to transpile ES6 code into ES5 & older compatible code
// For polyfilling new ES6 features (i.e not just syntax changes) to work with ES5 & older JS
import 'core-js/stable';
// For polyfilling async functions
import 'regenerator-runtime/runtime';

//
import cloneDeep from 'lodash-es';
import add, { cart } from './shoppingCart.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

// Cloning with lodash module
const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);

// This method of cloning objects uses a pointer.
// Any changes to original object will show in the copied object.
const stateClone = Object.assign({}, state);
state.user.loggedIn = false;
console.log(stateClone); // LoggedIn =  false
console.log(stateDeepClone); // LoggedIn = true

if (module.hot) {
  module.hot.accept();
}
