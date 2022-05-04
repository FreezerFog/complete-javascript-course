///////////////////////////////////////////////////////////
// VIDEO272: Importing and Exporting in ES6 Modules

// Importing Module
console.log('Importing Module');

// Importing all of the shopping cart module
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('Bread', 2);
ShoppingCart.addToCart('Apples', 6);
ShoppingCart.addToCart('Pizza', 1);
console.log(ShoppingCart.cart);
console.log(ShoppingCart.totalPrice);

// Importing the named exports individually from shopping cart module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('Bread', 5);
// console.log(price, tq);

// Importing the default export from shopping cart module
// import add from './shoppingCart.js';
// add('Carrots', 7);

// Combining default export and named exports from shopping cart module
// Never done, but technically possible
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log(price);
