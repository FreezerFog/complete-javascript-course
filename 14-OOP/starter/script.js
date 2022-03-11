'use strict';

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
