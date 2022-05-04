///////////////////////////////////////////////////////////
// VIDEO275: CommonJS Modules

// Node.js uses CommonJS Modules
// With CommonJS one file is one module

// Export with CommonJS (Only works on server via Node)
// export.addToCart = function(product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart. Shipping total ${shippingCost}`);
// }

// Import with CommonJS
// const { addToCart } = require('./shoppingCart.js');

// The way to create & use modules before ES6
// Useful to know because we will see this pattern in use
// Primarily done using IIFE 'Iffy' functions
// Works because of closures
// Doesn't work well with multiple files due to needing to load HTML scripts in proper order
// Bundling does not work with this approach
