///////////////////////////////////////////////////////////
// VIDEO277: Introduction to NPM

// Run npm install in order to get the required node_modules
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

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
