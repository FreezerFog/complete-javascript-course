///////////////////////////////////////////////////////////
// VIDEO273: Top-level Await (ES2022)

// Top Level Await
// Previously would have required an async function
// Blocks execution of entire rest of module
// Blocks execution of modules it exports to (until it finishes blocking code)
// Use with caution!

// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('End fetching');

async function getLastPost() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
}

// Consuming promise using top level await
const lastPost = await getLastPost();
console.log(lastPost);

// Consuming promise using then
// Not clean
const lastPostThen = getLastPost();
lastPostThen.then(last => console.log(last));

import * as ShoppingCart from './shoppingCart.js';
