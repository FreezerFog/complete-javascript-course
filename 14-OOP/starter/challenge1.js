'use strict';

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.message = function () {
  console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  this.message();
};

Car.prototype.brake = function () {
  this.speed -= 5;
  this.message();
  // console.log(`${this.make} going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 100);
const audi = new Car('Audi', 120);

bmw.message();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
console.log('------');
audi.message();
audi.brake();
audi.accelerate();
audi.accelerate();
audi.accelerate();
audi.accelerate();
audi.brake();
