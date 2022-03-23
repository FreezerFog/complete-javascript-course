'use strict';

class PersonCl {
  // Required
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Getters
  get age() {
    return 2022 - this.birthYear;
  }

  // Setting a property that already exists
  // Need to use a new variable name in order to avoid naming conflict with the
  // constructor method. The convention for this is to use a '_' prefix
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Methods will be added to .prototype property
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

///////////////////////////////////////////////////////////
// VIDEO214 Setters and Getters

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(move) {
    this.movements.push(move);
  },
};

console.log(account.latest);
account.latest = 777;
console.log(account.movements);

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica.age);

const walter = new PersonCl('Walter White', 1978);
console.log(walter);

///////////////////////////////////////////////////////////
// VIDEO213 ES6 Classes
/*
// Class Declarations
// class PersonCl {
//   // Required
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }

//   // Getters
//   get age() {
//     return 2022 - this.birthYear;
//   }

//   // Methods will be added to .prototype property
//   calcAge() {
//     console.log(2022 - this.birthYear);
//   }

// }

// Adding a method to a prototype works with ES6 classes
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

// Class Expression
// Classes in JS are just a type of function, so class expressions work
// const PersonCl = class {};

// const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();
jessica.greet();
*/

///////////////////////////////////////////////////////////
// VIDEO208 - VIDEO211 Constructor Functions - Prototypes - Prototypal Inheritance
/*
// Only difference between normal function and constructor function is the use of the 'new' operator

function Person(firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Methods
  // Never do this
  // Makes copy of function in every instance, very inefficient!
  // this.calcAge = function () {
  //   console.log(2022 - this.birthYear);
  // };
}

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(jonas);
console.log(matilda);
console.log(jack);

// instanceof
// Compares an object with a constructor function
// Returns true if object is an instance of the compared constructor function
console.log(jonas instanceof Person);

////// Prototypes //////
// Setting a function on the prototype so that each instance can use it
// Avoids creating a copy of function for each instance
Person.prototype.calcAge = function () {
  return 2022 - this.birthYear;
};
console.log(`Jonas Age: ${jonas.calcAge()}`);

// __proto__
// Returns the object's prototype
// Call on an object to check its prototype
console.log(jonas.__proto__);
// Person.prototype is NOT the prototype of PERSON, but instead is the prototype of every INSTANCE OF Person.
// The Person.prototype will be the same as the prototype of every instance of Person.
console.log(jonas.__proto__ === Person.prototype); // Returns TRUE
console.log(Person.prototype.isPrototypeOf(jonas)); // Returns TRUE
console.log(Person.prototype.isPrototypeOf(Person)); // Returns FALSE
// The above is the result of poor naming. Person.prototype suggests the prototype is for Person, not its linked objects.
// A better name would be something like Person.prototypeOfLinkedObjects

// Setting a property on the prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species);
console.log(matilda.species);
// Does NOT set the property on the object itself
console.log(jonas);
console.log(jonas.hasOwnProperty('firstName')); // True
console.log(jonas.hasOwnProperty('species')); // False

const arr = [3, 9, 122, 5, 10, 5, 5, 17, 9];
// Can see all properties and methods of the Array prototype, which is where all
// of our handy array methods come from
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

// Extending the standard Array prototype with a new function
// Not recommended to do this
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
*/
