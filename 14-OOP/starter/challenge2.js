'use strict';

///////////////////////////////////////////////////////////
// Coding Challenge 2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }

  accelerate() {
    this.speed += 10;
    this.logSpeed();
  }

  brake() {
    this.speed -= 5;
    this.logSpeed();
  }

  logSpeed() {
    console.log(`${this.make} going at ${this.speed} km/h`);
  }
}

// US Car
const mustang = new Car('Ford', 60);
mustang.accelerate();
console.log(mustang.speedUS);
mustang.accelerate();
mustang.accelerate();
mustang.accelerate();
mustang.accelerate();
mustang.accelerate();
console.log(mustang.speedUS);
mustang.speedUS = 100;
console.log(mustang);

// Recreate challenge 1
const bmw = new Car('BMW', 50);
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

const mercedes = new Car('Mercedes', 65);
mercedes.brake();
mercedes.accelerate();
mercedes.brake();
mercedes.brake();
mercedes.accelerate();
mercedes.accelerate();
