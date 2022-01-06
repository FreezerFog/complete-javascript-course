'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  stars: 4,
  openingHours: {
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
  },
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
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

///////////////////////////////////////
// Looping arrays with for of
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// Loops through array for each item
// for (const item of menu) console.log(item);

// As above, but with the index of each item. This turns each item into an array containing its index and its value
// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }

// As above, using array destructuring
// for (const [num, food] of menu.entries()) {
//   console.log(`${num}: ${food}`);
// }

///////////////////////////////////////
// Enhanced Object Literals

/* --------------- LOGICAL ASSIGNMENT OPERATORS --------------- */
/*
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};
// Adding number of guests using OR short-circuiting
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// OR assignment operator, same effect as above
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// NULLISH assignment operator (null or undefined)
// Assigns to 0
rest1.numGuests ??= 10;
// Assigns to 10
rest2.numGuests ??= 10;

// AND assignment operator
// Assigns variable to value if it is truthy
// rest1.owner does not exist, so the variable is not set
rest1.owner &&= '<ANONYMOUS>';
// rest2.owner does exist, so the variable is set to '<ANONYMOUS>'
rest2.owner &&= '<ANONYMOUS>';
console.log(rest1);
console.log(rest2);
*/

// --------------- ?? Nullish Coalescing Operator ---------------
/*
// OR short-circuiting resulting in 10, even though 0 should be guests
restaurant.numGuests = 0;
const guestsWithOr = restaurant.numGuests || 10;
console.log(guestsWithOr);
// ?? short-circuiting
// Works like ||, except it works with NULLISH values instead of FALSY values
// Nullish: null and undefined (NOT 0 or '')
restaurant.numGuests = 0;
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);
// ---------------  ---------------
*/

/*
// && and || Short Circuiting Section
// || Short-circuiting
// Can USE any data type, RETURN any data type, and short-circuiting is possible
// Short-circuiting: Execute first operand found with truthy value, else run last operand (even if it is false)
console.log('----- OR -----');
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);
// Setting variabe WITHOUT short-circuiting
restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
// Setting variable WITH short-circuiting
const guests2 = restaurant.numGuests || 10;
console.log(guests2);
// && Short-circuiting
// Works opposite of ||
// Returns first falsy value, else returns final value
console.log('----- AND -----');
console.log(0 && 'JONAS');
console.log(7 && 'JONAS');
console.log('Hello' && 23 && null && 'jonas');
// Using function WITHOUT && short-circuiting
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
// Using function WITH && short-circuiting
// Checks if restaurant.orderPizza exists. Only executes after && if it does exist
restaurant.orderPizza && restaurant.orderPizza('Basil', 'Goat Cheese');
///// END && and || Short Circuiting Section/////

// ----- OBJECT DESTRUCTURING SECTION -----
*/
/*
// Practical application of object destructuring, using an object as a
// function parameter in our object's method.
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Grand BLVD, 101',
  starterIndex: 2,
});
///// END /////
*/

/*
// Object destructuring
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
///// END object destructuring

/*
Object destructuring, without default object keys as new variable names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, categories);
///// END ///// 
*/

/*
// Object destructuring using default values for some variables
// 'name' is renamed
// 'stars' using default name
// 'menu' is given default value
// 'starterMenu is renamed and given default value'
const {
  name: restaurantName,
  stars,
  menu = [],
  starterMenu: starters = [],
} = restaurant;
console.log(restaurantName, stars, menu, starters);
///// END /////
*/

/*
// Mutating variables from objects
// Destructuring must be in a (), otherwise JS engine will think the {}
// are trying to execute a code block.
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);
///// END /////
*/

/*
// Destructuring nested objects
const { openingHours } = restaurant;
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);
///// END /////
*/

/*
// As above, with renaming
const { openingHours } = restaurant;
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);
///// END /////
*/

/*
// Multi-nested restructuring
// Only friday is restructured here, with 'open' and 'close'
// Could be renamed using "open: <variable>" syntax
const {
  openingHours: {
    fri: { open, close },
  },
} = restaurant;
console.log(open, close);
///// END /////
*/

///// END SECTION /////

///// ARRAY DESTRUCTURING SECTION /////
/*
// Array destructuring. 
// Looks like array, but isn't, they are variables
const arrayTest = [2, 4, 6];
const [x, y, z] = arrayTest;
console.log(x, y, z);
///// END Array destructuring
*/

/*
// Capturing elements using array destructuring
// Captures element 0 and 1 of categories array
const [first, second] = restaurant.categories;
console.log(first, second);
Captures element 0 and 2 of categories array, by skipping element 2 with the , , gap
const [first, , third] = restaurant.categories;
console.log(first, third);
///// END Capturing elements using array destructuring
*/

/*
// Switching element positions using variables
// Requires temp variables and 3 steps
let [main, secondary] = restaurant.categories;
let temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary); 
///// END Switching element positions using variables 
*/

/*
// Switching element positions with array destructuring
// Creates a new array and then assigns values to original array using 1 step
let [main, secondary] = restaurant.categories;
[main, secondary] = [secondary, main];
console.log(main, secondary);
restaurant.order(2, 0);
console.log(restaurant.order(2, 0));
const [starterCourse, mainCourse] = restaurant.order(2, 0);
console.log(`Starter: ${starterCourse} | Main: ${mainCourse}`);
///// END Switching element positions with array destructuring 
*/

/*
///// Nested destructuring
// Destructuring, grabbing entire nested array as second value;
const nestedArray = [2, 4, [5, 6]];
const [elementOne, , elementThree] = nestedArray;
console.log(elementOne, elementThree);

// Destructuring, with a second destructuring grabbing the values of nested array
const [i, , [j, k]] = nestedArray;
console.log(i, j, k);
///// END Nested destructuring
*/

/*
///// Setting default values of destructured array
// Useful if we do not know length of array we are destructuring
// Without default value r would be 'undefined', here it is 1
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
///// End setting default values of destructured array 
*/

// SPREAD ... OPERATOR SECTION
/*
// ... operator is like taking all elements out of an array
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);
const goodNewArray = [1, 2, ...arr];
console.log(goodNewArray);
// Spread ... returns values of array, not an array, see below
console.log(...goodNewArray);
// Another example, making a new menu using our object's menu array
const newMenu = [...restaurant.mainMenu, 'Gnocci', 'Calzone'];
console.log(newMenu);
///// END /////
*/

/*
// Copy array, using a 'shallow' copy
const mainMenuCopy = [...restaurant.mainMenu];
// Join two arrays or more together
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);
// Iterables: strings, arrays, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str];
console.log(letters);
///// END /////
*/

/*
// Using spread with functions, real world example
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt("Let's make pasta! Ingredient 2?"),
  prompt("Let's make pasta! Ingredient 3?"),
];
console.log(ingredients);
// Using the 'orderPasta' function without spread
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// Using 'orderPasta' function with spread
restaurant.orderPasta(...ingredients);
///// END /////
*/

/*
// Using spread with objects (even though they aren't iterables)
const newRestaurant = { ...restaurant, founder: 'Guisam', foundedIn: 2020 };
console.log(newRestaurant);
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
///// END /////
*/

/*
// MY EXAMPLE, spreading objects
const patient = {
  name: 'Alan Rickman',
  number: '435-8819',
  diagnosis: ['Hypertension', 'High blood pressure'],
};
const hospital = {
  doctor: 'Gooding',
  insuranceAccepted: ['Premera', 'Regence'],
};
const patientCareChart = {
  ...patient,
  ...hospital,
};
console.log(patientCareChart);
patientCareChart.doctor = 'Mann';
console.log(patientCareChart);
///// END /////
*/

///// END SPREAD SECTION /////
// REST Patterns & Parameters
/*
// 1) DESTRUCTURING
// Similar to spread, but the ... is on the LEFT of the assignment operator '='
// Called REST because it takes all remaining elements of array and returns new array
// Must always be the last item in the destructuring assignment
// One REST max per assignment
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);
// REST works from the last named variable. In this case 'risotto'.
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
// REST with objects
const { sat, ...weekdays } = restaurant.openingHours;
console.table(weekdays);
///// END /////
*/

/*
// 2) FUNCTIONS
// Using REST parameters
// The function RESTs 'numbers' into an array so we can iterate through it
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
  return sum;
};
add(2, 3);
add(5, 3, 7, 2);
add(11, 6, 5, 4, 8, 7);
// Here we SPREAD this array into different values and pass them into add()
// We pack them here, then unpack them in add() using REST
// Now our function can accept multiple values and arrays (with spread)
const x = [23, 5, 7];
add(...x);
// Practical example using object function
restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
///// END /////
*/

///// END REST SECTION /////
