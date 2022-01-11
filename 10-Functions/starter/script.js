'use strict';

///////////////////////////////////////
// Closures
// VIDEO137

// Closures are the variable environments that are attached to a function exactly as it was at the time and place the function was created; even if the execution context is now gone due to execution context coming off of the call stack and the subsequent destruction of the execution context's scope.
// Closures are automatic. They do not need to be defined by us.
// Every function always has access to the variable environment of the execution context in which the function was created. Essentially, every function is a closure.
// This means that after we call secureBooking() and assign it to booker, booker will have access to the passengerCount variable.

function secureBooking() {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
}

// booker is now the return function of secureBooking()
// secureBooking() finishes execution context, leaves the call stack, and scope closes
const booker = secureBooking();
// Thanks to closures we can still access passengerCount
booker(); // passengerCount = 1
booker(); // passengerCount = 2
booker(); // passengerCount = 3

// Closure variables take precedence over identical variables further up the scope chain
// e.g The code below would use the closure variable, not the global variable.
let passengerCount = 11;
booker(); // passengerCount = 4
// The exception would be if the variable is created, but NOT assigned a value

// More closure examples
// Example 1 - Closure overwriting
let f;

function g() {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
}

function h() {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
}

// Closure occurs, f remembers a
g();
f();
console.dir(f);

// Reassigning f function
// Another closure occurs, f remembers b, it has forgotten a
h();
f();
console.dir(f);

// Example 2 - Timer
// The setTimeout function relies on its closure access to perGroup and numPassengers
function boardPassengers(numPassengers, waitTime) {
  const perGroup = numPassengers / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${numPassengers}.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers.`);
  }, waitTime * 1000);

  console.log(`Will start boardin in ${waitTime} seconds.`);
}
boardPassengers(180, 3);

// Proving that closure variables have priority up the scope chain
// Uses 99 from boardPassengers() execution, despite setTimeout running 4 seconds after // boardPassengers has closed its scope. perGroup 99 persists! perGroup 1000 not needed.
const perGroup = 1000;
boardPassengers(99, 4);

/*
///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
// VIDEO136

// IIFE are functions that run once, immediately, and never again

// Using function statement
// Write a function statement, place it in (), and invoke it immediately with ()
(function () {
  console.log('This function statement will never run again');
})();

// Using arrow function
// Write arrow function, place it in (), and invoke it immediately with ()
(() => console.log('This arrow function will never run again'))();
*/

/*
///////////////////////////////////////
// call(), apply(), bind() methods
// VIDEO133, VIDEO134

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name,
    });
  },
};

lufthansa.book(239, 'Derek Weese');
lufthansa.book(635, 'Caryn Weese');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT Work. No 'this' available because book is a copy of lufthansa.book, so
// the this property is equal to undefined
// eurowings.book(777, 'Chad Smith');

// Call method
// Using call(), we specify the 'this' reference as the first argument
// 'this' = eurowings, then call the book() function with its normal arguments
// call() will call book with it's arguments. book() does not call call()!
book.call(eurowings, 777, 'Chad Smith');
console.log(eurowings.bookings);

book.call(lufthansa, 169, 'Nacho Gizmo');
console.log(lufthansa.bookings);

// Apply method
// Expects an array of arguments after the 'this' argument
// Apply is not used often anymore due to the spread operator (we can spread onto call!)
const flightData = [583, 'George Carlin'];
book.apply(eurowings, flightData);
console.log(eurowings.bookings);

// Call method using ... spread operator
book.call(lufthansa, ...flightData);
console.log(lufthansa.bookings);

// Bind method
// bind() returns a new function where 'this' is bound to first argument we pass
// Other arguments become set for the function, see bookEW23 below
// eurowings is now bound to book method with bookEW
const bookEW = book.bind(eurowings);
bookEW(333, 'Steven Williams');
console.log(eurowings.bookings);

// We set the flightNum to 23 for every booking made with bookEW23
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Derek Weese');
bookEW23('Caryn Dudley');
console.log(eurowings.bookings);

// Bind with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
  console.log('-------');
};

// Doesn't work. 'this' become the buy button element.
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// WORKS
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial Application, common use case for bind() method.
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
// Use bind and set 'this' to null, then set rate to value we want
const salesTaxWA = addTax.bind(null, 0.11); // salesTaxWA = value => value * .11
console.log(salesTaxWA(200));
// Bind gives us a new, more specific function to use from a more general function

// Challenge
// Rewrite bind above with functions returning functions
const addStateTax = (rate, value) => value + value * rate;

function addTaxRate(rate) {
  return function (value) {
    return value + value * rate;
  };
}

const addTaxRateArrow = rate => value => value + value * rate;
console.log(addTaxRate(0.15)(4000));
console.log(addTaxRateArrow(0.2)(1000));
/*


/*
///////////////////////////////////////
// Functions returning functions
// VIDEO132

// Greet returns the anonymous function inside it
function greet(greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
}
// greeterHey becomes return of greet, the anonymous function, with greeting of 'hey'
const greeterHey = greet('Hey');
// greeterHey is called. It expects a name.
greeterHey('Jonas');
greeterHey('Derek');
// Calling greet() with argument of 'Hello there!', the return is the function, so we //// can chain it with a function call, the (), with a name argument inside of it
greet('Hello there!')('Derek');

// Challenge
// Refactor of above with arrow functions
// Works the exact same way as above
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
const greeterHeyArrow = greetArrow('Hey');
greeterHeyArrow('Derek');
greetArrow('Hello there!')('Derek');
*/

/*
///////////////////////////////////////
// Functions that accept callback functions
// VIDEO131

// Javascript uses callback functions VERY frequently

// Higher-order function
// We pass in a function to this function
function transformer(str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
  console.log('----------');
}
transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

// Another example
function high5() {
  console.log('5!');
}
// eventListener function calls high5
document.body.addEventListener('click', high5);

// Another example
// forEach function calls high5
['Derek', 'Hal', 'Tony'].forEach(high5);
*/

/*
///////////////////////////////////////
// Passing Arguments: Value vs Reference
// VIDEO 129

const flight = 'LH234';
const derek = {
  name: 'Derek Weese',
  passport: 28918912921,
};

function checkIn(flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = `Mr. ${passenger.name}`;

  if (passenger.passport === 28918912921) {
    alert('Check In');
  } else {
    alert('Wrong Passport');
  }
}

// Javascript only has passing by value. It does not have passing by reference!
// When passing an object we are still passing by value because we are passing the 
// memory value of the object.

checkIn(flight, derek);
// flight is a primitive type, changes WILL NOT change flight outside function scope
// derek is an object. The memory value is passed. Changes WILL effect object
console.log(flight); // Results: flight stays LH234
console.log(derek); // Results: derek name changes to Mr. Derek Weese

// The arguments we pass to our checkIn function are essentially doing this:
const flightNum = flight; // flightNum becomes copy of flight
const passenger = derek; // Passenger points to derek object
//    Any changes to flightNum only change flightNum. flight is NOT changed.
//    Any changes to passenger will change the derek object
*/

///////////////////////////////////////
// Default Parameters
// VIDEO128

/*
function oneWord(str) {
  return str.replace(/ /g, '').toLowerCase();
}
function upperFirstWord(str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
}
*/

/*
// ES6 method for default params
// Can perform calculation using other params if wanted
// Param must exist before used for calc.
//   e.g cant calc price then numPassengers
// Calc only works of param if default value is used.
//   e.g Entering price overwrites price calc
function createBooking(
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  bookings.push(booking);
  console.log(booking);
}
const bookings = [];
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
*/

/*
// ES5 method for default params. Bulky and ugly! 
function createBooking(flightNum, numPassengers, price) {  
  numPassengers = numPassengers || 1;
  price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  bookings.push(booking);
  console.log(booking);
}
const bookings = [];
createBooking('LH123');
*/
