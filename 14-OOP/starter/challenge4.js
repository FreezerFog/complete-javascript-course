'use strict';

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  acceleratefunction() {
    this.speed += 10;
    this.logSpeed();
  }

  brake() {
    this.speed -= 5;
    this.logSpeed();
    return this;
  }

  logSpeed() {
    console.log(`${this.make} going at ${this.speed} km/h`);
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    if (chargeTo > 100) {
      this.#charge = 100;
    } else if (chargeTo < 0) {
      this.#charge = 0;
    } else {
      this.#charge = chargeTo;
    }

    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    let speedMsg = `${this.make} going at ${
      this.speed
    } km/h, with a charge of ${this.#charge}%`;

    if (this.#charge <= 0) {
      this.speed = 0;
      this.#charge = 0;
      speedMsg = `Battery at 0%. The car has stopped.`;
    }

    console.log(speedMsg);
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 78);
console.log(rivian);
rivian
  .accelerate()
  .accelerate()
  .brake()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .brake()
  .accelerate()
  .accelerate()
  .chargeBattery(70)
  .accelerate();
