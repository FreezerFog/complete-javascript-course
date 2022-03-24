'use strict';

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

function Car(make, speed) {
  this.make = make;
  this.speed = speed;

  this.acceleratefunction = function () {
    this.speed += 10;
    this.logSpeed();
  };

  this.brake = function () {
    this.speed -= 5;
    this.logSpeed();
  };

  this.logSpeed = function () {
    console.log(`${this.make} going at ${this.speed} km/h`);
  };
}

function EV(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;

  this.chargeBattery = function (chargeTo) {
    if (chargeTo > 100) {
      this.charge = 100;
    } else if (chargeTo < 0) {
      this.charge = 0;
    } else {
      this.charge = chargeTo;
    }
  };

  this.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    let speedMsg = `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`;

    if (this.charge <= 0) {
      this.speed = 0;
      this.charge = 0;
      speedMsg = `Battery at 0%. The car has stopped.`;
    }

    console.log(speedMsg);
  };
}

function createChildToParentPrototypeChain(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

createChildToParentPrototypeChain(EV, Car);
// Same as this
// EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = EV;

const tesla = new EV('Tesla', 120, 78);
console.log(tesla);
console.log(tesla.speed);
tesla.chargeBattery(9);
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
