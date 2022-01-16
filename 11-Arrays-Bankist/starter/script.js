'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUSD = 1.1;

function calcDisplayBalance(movements) {
  const balance = movements.reduce((total, mov) => total + mov, 0);
  labelBalance.textContent = `${balance}€`;
}
calcDisplayBalance(account1.movements);

function createUsernames(accs) {
  // Loop over accounts array
  accs.forEach(function (acc) {
    // Each iteration, add new key: 'username' with new value: initials to acc object
    acc.username = acc.owner
      .split(' ')
      .map(name => name.at(0))
      .join('')
      .toLowerCase();
    // No need to return anything. We mutated the initial array of objects instead
  });
}
createUsernames(accounts);

function displayMovements(movements) {
  // Remove any existing elements from the amounts container
  containerMovements.innerHTML = '';

  movements.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${index + 1} ${type}
      </div>
      <div class="movements__date">NA</div>
      <div class="movements__value">
        ${movement}
      </div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}
displayMovements(account1.movements);

const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);
const usdMovements = movements.map(movement => movement * euroToUSD);
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

/*
///////////////////////////////////////
// Reduce Method

// Reduce calls a callback function for each array element, then returns a single value. The returned value can be a simple data type or even an array or object.

// Using reduce to return the highest value found
const maxMovement = movements.reduce(
  (max, mov) => (max = mov > max ? mov : max),
  movements[0]
);
console.log(movements);
console.log(maxMovement);

// function calcDisplayBalance(movements) {
//   const balance = movements.reduce((total, mov) => total + mov, 0);
//   labelBalance.textContent = `${balance}€`;
// }
// calcDisplayBalance(movements);

// Arrow function syntax with implicit return
// const balance = movements.reduce((total, mov) => total + mov, 0);
// console.log(balance);

// As above, using standard callback function syntax
// const totalMovements = movements.reduce(function (total, mov) {
//   return total + mov;
// }, 0);
// console.log(totalMovements);
*/

/*
///////////////////////////////////////
// Filter Method
// VIDEO152

// Filter creates new array with only elements that pass a test

// Arrow function syntax with implicit return
const deposits = movements.filter(mov => mov > 0);
// console.log(deposits);
const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// As above, using standard callback function syntax
// const deposits = movements.filter(function (mov) {
//   // Return a boolean value
//   return mov > 0;
// });
// console.log(deposits);
*/

/*
///////////////////////////////////////
// Computing Usernames
// VIDEO151

// Convert to 'stw'
const user = 'Steven Thomas Williams'; // STW

function createUsernames(accs) {
  // Loop over accounts array
  accs.forEach(function (acc) {
    // Each iteration, add new key: 'username' with new value: initials to acc object
    acc.username = acc.owner
      .split(' ')
      .map(name => name.at(0))
      .join('')
      .toLowerCase();
    // No need to return anything. We mutated the initial array of objects instead
  });
}
createUsernames(accounts);
console.log(accounts);
*/

/*
///////////////////////////////////////
// Map Method
// VIDEO150

// Map calls a callback function on each array element, and returns a new array with new values based on the callback function.

// Using map() with an arrow function and implicit return
const usdMovements = movements.map(movement => movement * euroToUSD);

// Same as above, with standard callback function syntax
// const usdMovements = movements.map(function (movement) {
//   return movement * euroToUSD;
// });

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
*/

/*
///////////////////////////////////////
// DOM Elements
// VIDEO147

function displayMovements(movements) {
  // Remove any existing elements from the amounts container
  containerMovements.innerHTML = '';

  movements.forEach(function (movement, index) {
    // Sets type of transaction based on positive/negative value
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    // Use template literal to build HTML we want for displaying movements
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${index + 1} ${type}
      </div>
      <div class="movements__date">NA</div>
      <div class="movements__value">
        ${movement}
      </div>
    </div>
    `;

    // Insert HTML into the containerMovements html section
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}
displayMovements(account1.movements);
*/

/*
///////////////////////////////////////
// forEach with Maps and Sets
// VIDEO145

// forEach with map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// forEach with set
const currenciesSet = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// value and key params will both return the element's value
// the key param space is only there to make remembering forEach syntax easier
currenciesSet.forEach(function (value, key, set) {
  console.log(`${key}: ${value}`);
});
*/

/*
///////////////////////////////////////
// forEach Method
// VIDEO144

// forEach calls a callback function on each array element
// Accepts parameters for: function(element, index, array)
// Can be done with arrow, callback, and inline callback functions
// CANNOT break out of a forEach() loop

movements.forEach(function (mov, i, array) {
  if (mov > 0) {
    console.log(`Movement ${i}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i}: You withdrew ${Math.abs(mov)}`);
  }
});
*/

/*
///////////////////////////////////////
// At Method
// VIDEO143

// Returns element value at the given param position
const arr = [23, 11, 64];
console.log(arr.at(0));

// Ways to get last element in array
console.log(arr.at(-1));
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
*/

/*
///////////////////////////////////////
// Simple Array Methods
// VIDEO142

let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice Method
// Extract part of an array without changing original array
// Accepts starting position and ending position
// If a negative number is used it will count from the end of the array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice(-4, -2));
// Shallow copy of an array, by passing no params, allows chaining
console.log(arr.slice());
// Shallow copy of an array, using ... spread
console.log([...arr]);

// Splice Method
// Returns elements starting at param 1, for count of param 2.
// Mutates array by removing the return items permanently.
// Usually we're only interested in removing items aspect.
console.log(arr.splice(2, 2)); // Returns ["c", "d"], the removed elements
console.log(arr); // Returns ["a", "b", "e"], c & d are gone due to previous splice()

// Reverse Method
// Returns the reversed array and mutates original
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['d', 'e', 'r', 'e', 'k'];

console.log(arr.reverse());
console.log(arr);
console.log(arr2.reverse());
console.log(arr2);

// Concat Method
// Concatonates 2 arrays togehter
const letters = arr.concat(arr2);
console.log(letters);
// Can also be done with spreads
console.log([...arr, ...arr2]);

// Join method
// Turns array into a string, using the param as the separator between them.
console.log(letters.join(' - '));
// Empty param will give ','
console.log(letters.join());
*/
