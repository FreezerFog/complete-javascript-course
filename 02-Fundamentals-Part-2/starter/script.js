'use strict';

/*
let hasDriversLicense = false;
const passTest = true;
if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive");
use strict reserves words for use and throws warnings if you do use one
reserved word below is private
const private = 'Audio';
*/

/*
let fruitOfTheDay = "banana";
let gallonsOfGas = 11;
function logger(varName, variable) {
  // TODO: Delete logger and all calls to it
  console.log(`${varName}| value: ${variable}| typeof: ${typeof variable}`);
}
logger("fruitOfTheDay", fruitOfTheDay);
logger("gallonsOfGas", gallonsOfGas);
*/

/*
// FUNCTION DECLARATION
// Allos you to call function from anywhere in the code.
function calcAge1(birthYear) {
  return 2021 - birthYear;
}
const age1 = calcAge1(1988);
// FUNCTION EXPRESSION
// Function gets stored in a variable
// Doesn't let you call function before it is written
const calcAge2 = function (birthYear) {
  return 2021 - birthYear;
}
const age2 = calcAge2(1988);
// ARROW FUNCTION
// A special form of a function expression that is shorter
// Uses implicit return. Value to right of => is returned if {} not used
// DO NOT get a THIS keyword and value
const calcAge3 = birthYear => 2021 - birthYear;
const age3 = calcAge3(1988);
console.log(`Age1: ${age1} | Age2: ${age2}| Age3: ${age3}`);
// Another arrow function, but with multiple parameters and more complex stuff running in the function
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2021 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years.`
}
console.log(yearsUntilRetirement(1988, "Derek"));
*/

///////////////////////////////////////
// Coding Challenge #1
/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!
1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.
TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
GOOD LUCK 😀

// MY SOLUTION ////////
let calcAverage = (scoreOne, scoreTwo, scoreThree) => (scoreOne + scoreTwo + scoreThree) / 3;
function checkWinner(avgDolphins, avgKoalas) {
  if(avgDolphins >= avgKoalas * 2) {
    console.log(`Dolphins Win! (${avgDolphins} vs ${avgKoalas})`);
  } else if(avgKoalas >= avgDolphins * 2) {
    console.log(`Koalas Win! (${avgKoalas} vs ${avgDolphins})`);
  } else {
    console.log("No one wins");
  }
}
checkWinner(calcAverage(44, 23, 71), calcAverage(65, 54, 49));
checkWinner(calcAverage(85, 54, 41), calcAverage(23, 34, 27));
console.log(calcAverage(11,24,20));
// END CODING CHALLENGE 1 /////////
*/


///////////////////////////////////////
// Coding Challenge #2
/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
2. And now let's use arrays! So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 😉

GOOD LUCK 😀

// MY SOLUTION CHALLENGE 2 ////////////
function calcTip(bill) {
  return bill >= 50 && bill <= 300 ? (bill * .15) : (bill * .20);
}
const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(bills, tips, totals);
*/
/////////////////////////
// End Coding Challenge 2
/////////////////////////

// OBJECTS
/*
const derek = {
  firstName: 'Derek',
  lastName: 'Weese',
  occupation: 'student',
  age: 2021 - 1988,
  friends: ['Caryn', 'Jaime', 'Lucas']
};
Two ways to access object key: value pairs: Dot and Bracket notation
Object Dot Notation
  $ derek.lastName
Object Brackets Notation
  $ derek['lastName']
Brackets notation allows us to use computed values. We could use:
  - a variable
  - a function
  - etc
Add properties to an object
Dot Notation
  $ derek.location = "Seattle";
Bracket Notation
  $ derek['github'] = 'FreezerFog';
let message = `${derek.firstName} has ${derek.friends.length} friends. His best friend is ${derek.friends[0]}.`;
console.log(message);

const derek = {
  firstName: 'Derek',
  lastName: 'Weese',
  occupation: 'student',
  birthYear: 1988,
  friends: ['Caryn', 'Jaime', 'Lucas'],
  canDrink: true,
  // Works like a normal function expression
  // calcAge: function(birthYear) {
  //   return 2021 - birthYear;
  // }
  // Returns a calculated value
  // calcAge: function() {
  //   return new Date().getFullYear() - this.birthYear;
  // },
  // Creates, sets, and returns 'age', a new key|value pair
  calcAge: function() {
    this.age = new Date().getFullYear() - this.birthYear;
    return this.age;
  },
  getDetails: function(){
    return `${this.firstName} ${this.lastName} is a ${this.calcAge()} year old ${this.occupation}. He ${this.canDrink ? 'loves an occasional drink' : 'does not drink'}.`;
  }
};
console.log(derek.calcAge());
console.log(derek['calcAge']());
console.log(derek.age);
console.log(derek.getDetails());
console.log(derek);
*/

///////////////////////////////////////
// Coding Challenge #3
/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method.
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

TEST DATA: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
GOOD LUCK 😀
*/

/////// MY ANSWER! //////////
/*
let mark = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function() {
    this.bmi = (this.mass / (this.height ** 2)).toFixed(2);
    return this.bmi;
  }
};
let john = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function() {
    this.bmi = (this.mass / (this.height ** 2)).toFixed(2);
    return this.bmi;
  }
};
if (mark.calcBMI() > john.calcBMI()) {
  console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!`);
} else if (mark.calcBMI() < john.calcBMI()) {
  console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})!`);
} else {
  console.log("${mark.fullName} and ${john.fullName} have the same BMI!");
}
*/
////////// END CODING CHALLENGE 3 //////////

// ARRAYS
let dataTypes = ['A string', 32, false, 'Another string', ['Cats', 'Dogs', 'Fish']];

/*
// Looping through an array, printing all strings
for (let i = 0; i < dataTypes.length; i++) {
  // Continue tells the program to skip the rest of the current iteration
  if (typeof dataTypes[i] !== 'string') continue;
  console.log(dataTypes[i]);
} 
*/

/*
// Looping through an array, exiting once number is found
for (let i = 0; i < dataTypes.length; i++) {
  // Break tells the program to exit the loop when it is called
  if (typeof dataTypes[i] !== 'number') break;
} 
*/

/*
for (let rep = 0; rep <= 10; rep++) {
  console.log(`Exercise Rep #${rep}`);
}
console.log('While Loop -------')
*/

/*
// Looping through a while statement. 
// While loops do not need a counter, they just need a condiition. 
// This makes them more versatile.
let rep = 1;
while (rep <= 10) {
  console.log(`Exercise Rep #${rep}`);
  rep++;
}
*/
/*
let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
  console.log(`Dice roll is ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log('YOU ROLLED A SIX!');
}
*/

///////////////////////////////////////
// Coding Challenge #4

/*
Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

HINT: Call calcTip in the loop and use the push method to add values to the tips and totals arrays 😉

4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it:
  4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array

GOOD LUCK 😀
*/
/*
// MY SOLUTION CODING CHALLENGE #4 
let bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let totals = [];
function calcTip(bill) {
  return bill >= 50 && bill <= 300 ? (bill * .15) : (bill * .20);
}
function calcAverage(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return (total / array.length).toFixed(2);
}
for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(calcTip(bills[i] + bills[i]));  
}
console.log(tips);
console.log(totals);
console.log(`Average total: $${calcAverage(totals)}`);
// END MY ANSWER CHALLENGE #4
*/
