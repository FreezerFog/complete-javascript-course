'use strict';

// FROM VIDEO LECTURE 112, 113, 114, 116, 117, 118
// Object literals, optional chaining, looping objects, sets, maps fund and iter,

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  stars: 4,
  // ES6 enhanced object literal, no need to assign openingHours: openingHours
  openingHours,

  // Can compute property names now instead or writing them manually & literally

  order: function (starterMenuIndex, mainMenuIndex) {
    return [this.starterMenu[starterMenuIndex], this.mainMenu[mainMenuIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address: deliveryAddress,
  }) {
    console.log(starterIndex, mainIndex, time, deliveryAddress);
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}. Order submitted at ${time}. Deliver to ${deliveryAddress}.`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2},${ing3}`);
  },

  // ES6 New way to write methods. No need to assign a function (like above)
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

// restaurant.orderPizza('Mushrooms', 'Olives', 'Pineapple');

///////////////////////////////////////
// Maps

// Creating an empty map
const rest = new Map();

// Adding key (name) and value (Classico Italiano) to the map
// A shortcut for multiple values later in file at #MULTISET
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');

// Setting values in a map returns the updated map
console.log(rest.set(3, 'London, England'));

// Sets can be chained together
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

// Read data from map using get method, pass in the key you want value for
console.log(rest.get('name'));
console.log(rest.get(true));

// Comparing data from get methods, the logical operator will return true or false
// which will return the corresponding key in the map.
const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
// Basic version of above. Finds key for 2 and returns the value there
console.log(rest.get(3 - 1));

// Check if map contains a certain key with has method
console.log(rest.has('categories'));

// Delete elements from map using delete method
rest.delete(2);
console.log(rest);

// Check size of map with size method
console.log(rest.size);

// Remove all items in map using clear method
// rest.clear();
// console.log(rest);

// Setting an array as a key
// Must use a variable or else you won't be able to find key again
// Sets key/value pair, but cannot be retrieved
rest.set([1, 2], 'Test set with plain array');
console.log(rest.get([1, 2])); // Return undefined
// Setting with variable can be returned
const arr = [1, 2];
rest.set(arr, 'Test set with variable in memory');
console.log(rest.get(arr));

// Setting an object as a key
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);

// Setting multiple key/value pairs at a time #MULTISET
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct! JS rules'],
  [false, 'Try again'],
]);
console.log(question);

// Convert an object to a map with Object.entries()
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Iterating through maps
// Here we use a for loop, with destructuring, to simplify the block
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// let answer = Number(prompt('Your answer'));
// console.log(question.get(question.get('correct') === answer));

// Convert map to array
// Create empty array and unpack the map using the spread operator
console.log([...question]);

// Maps have same methods as objects
question.entries();
question.keys();
question.values();

/*
///////////////////////////////////////
// Sets
// Sets are collections of only unique values. No duplicates allowed.
// Sets do not have indexes and it is not possible to obtain a value from a set
// Set() accepts iterables
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet);

// Length of a set
console.log(ordersSet.size);

// Checks if set contains value
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));

// Add value to set
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log(ordersSet);

// Remove value from set
ordersSet.delete('Risotto');
console.log(ordersSet);

// Remove all values from a set
// ordersSet.clear();

// Loop through a set
for (const order of ordersSet) {
  console.log(order);
}

// EXAMPLE real use case of a set
// Restaurant wants to know all the unique positions in their restaurant
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

// Makes a set like normal
const staffUnique = new Set(staff);

// Using set to check the number of unique positions
console.log(new Set(staff).size);

// Using ... spread to unpack the set into a new array.
const staffUniqueArray = [...new Set(staff)];
console.log(staffUniqueArray);
*/

/*
///////////////////////////////////////
// Looping objects

// Looping over property names/keys
// Use Object.keys to turn an object's keys into array, then loop through it
for (const day of Object.keys(openingHours)) {
  console.log(day);
}

// Looping over property values
// Use Object.values to turn an object's value into array, then loop through it
for (const hours of Object.values(openingHours)) {
  console.log(hours);
}

// Looping over names and values together
// Turns each property/value pair into a 2 element array
// With nested destructuring. Beautiful! Other ways demo'd below
for (const [day, { open, close }] of Object.entries(openingHours)) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

// With destructuring of array into key and value. Better!
// for (const [key, value] of Object.entries(openingHours)) {
//   console.log(`On ${key} we open at ${value.open} and close at ${value.close}`);
// }

// Without destructuring. Very brute force!
// for (const data of Object.entries(openingHours)) {
//   const day = data[0];
//   const open = data[1].open;
//   const close = data[1].close;
//   console.log(`On ${day} we open at ${open} and close at ${close}`);
// }
/*

/*
///////////////////////////////////////
// Optional Chaining

// Without optional chaining. mon doesn't exist, this returns undefined
// console.log(restaurant.openingHours.mon);
// Calling another property on undefined produces an error
// Would require if statements or logic to avoid errors
// console.log(restaurant.openingHours.mon.open);

// With optional chaining, we return undefined on first undefined property
console.log(restaurant.openingHours.mon?.open);
// Can be used multiple times. Below, we check if openingHours exists, then mon
console.log(restaurant.openingHours?.mon?.open);

// REAL world example of optional chaining
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  // Reminder, we use bracket notation for imputed property names in chains
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Optional chaining with methods
// We can check if a method exists while calling it
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Optional chaining with arrays
const users = [
  { name: 'Jonas', email: 'hi@aol.com' },
  { name: 'Bob', email: 'bob@yahoo.com' },
  { name: 'April', email: 'hickvill@google.com' },
];
console.log(users[0]?.name ?? 'User array empty');
*/

/*
///////////////////////////////////////
// Computing property names

// Computing property names example, properties derived from array and math
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
  [`day${2 + 4}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
*/
