///////////////////////////////////////////////////////////
// VIDEO273: Top-level Await (ES2022)

// Top-level await
// For example of a module blocking modules that import it
// shoppingCart.js module blocks script.js from executing until fetch is fulfilled
console.log('Start fetching users');
await fetch('https://jsonplaceholder.typicode.com/users');
console.log('Finish fetching users');
