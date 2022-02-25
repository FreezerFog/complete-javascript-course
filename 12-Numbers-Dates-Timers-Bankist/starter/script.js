'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

///////////////////////////////////////
// Creating Dates
// VIDEO175

// Create a date. We have 4 ways to do this
// 1) Using new Date() object
// const now = new Date();
// console.log(now);
// 2) Using string parsing
// console.log(new Date('Sat Jan 29 2022 16:17:18'));
// console.log(new Date('December 24, 2021'));
// console.log(new Date(account1.movementsDates[0]));
// 3) Using numeric inputs
// The month field is 0 based
// Below returns November date, not October!
// console.log(new Date(2037, 10, 19, 15, 23, 5));
// console.log(new Date(2037, 10, 33)); // JS autocorrects date based on day values
// 4) Using milliseconds
// console.log(new Date(0)); // Returns 12/31/1969
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Three days after Date(0)

// Working with dates
// Never use getYear(), it has been deprecated
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth()); // Returns the month, and is ZERO BASED
console.log(future.getDate()); // Returns day of the MONTH
console.log(future.getDay()); // Returns day of the WEEK
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // toISOString() - Returns date string
console.log(future.getTime()); // Returns timestamp (in milliseconds)
console.log(Date.now()); // Returns timestamp for the moment it is called

// Setting Dates
// Same format as getting dates. Only showing 1 example here
future.setFullYear(2040);
console.log(future);

///////////////////////////////////////
// Working with BigInt
// VIDEO174
/*

// In the past max number Javascript could save with binary is: 9007199254740991
console.log(Number.MAX_SAFE_INTEGER);
// console.log(7897328479129476234789621340); // Not precise, is WRONG

// BigInt allows us to store very large numbers
console.log(7897328479129476234789621340n);
console.log(BigInt(7897328479129476234789621340)); // Less precise, for smaller nums

// Operations
// Works the same as with Numbers
console.log(10000n + 10000n);
console.log(8782937832479834798718943739427324 * 2394328432897432897489791);
// Cannot mix BigInt with regular Numbers unless you type cast to BigInt first
const hugeBigInt = 23467987723498934718942370n;
const smallNumber = 23;
// console.log(hugeBigInt * smallNumber); // Error
// console.log(hugeBigInt * BigInt(smallNumber)); // Works due to type casting

// Cannot use Number methods on BigInt
// console.log(Math.sqrt(hugeBigInt)); // Error

// Exceptions to cannot mix rules
console.log(20n > 15); // Works
// The === compares type and value, so a BigInt will NOT match a Number
console.log(20n === 20); // False, Number not same as BigInt
console.log(20n == '20'); // True, Javascript type coerces to 20 on both sides
console.log(hugeBigInt + ' is REALLY big!!!');

// Divisions
console.log(11n / 3n); // Returns 3, the closest whole number BigInt value
*/

///////////////////////////////////////
// Numeric Separators
// VIDEO173
/*

// Numeric separators make it easier to read the numbers we use in our code
// 287,460,000,000 as a variable is hard to read
// We can use _ as a comma to make it easier to read
// const diameter = 287460000000;
const diameter = 287_460_000_000;
console.log(diameter);

const priceInCents = 345_99;
console.log(priceInCents);

const transferFee1 = 15_00;
const transferFee1 = 1_500;

// The _ can only be placed between numbers. Decimals, commas, etc will break it
// Cannot be placed at beginning or end of number either.
// Cannot place two _ in a row:
const PI = 3.14_15;
console.log(PI);
// Does not work in strings
// console.log(Number('230_000')); // Return NaN
// console.log(parseInt('230000')); // Return 230
*/

///////////////////////////////////////
// The Remainder Operator
// VIDEO172
/*

// % Remainder Operator (aka Modulus)
// Returns the remainder of a division problem
// Example:
// 5 / 3 returns 1.666666666667
// 5 % 3 returns 2
// 3 goes into 5 1 time. Subtract 3 from 5 and you get 2, our remainder
console.log(5 % 3); // Returns 2
console.log(15 % 3); // Returns 0
console.log(15 % 4); // Returns 3

// Checking if something is even or odd.
function isEven(num) {
  return num % 2 === 0;
}

console.log(isEven(7));
console.log(isEven(14));
console.log(isEven(56));
console.log(isEven(99));

// Using modulus with DOM elements
labelBalance.addEventListener('click', function () {
  // Spread nodelist into an array
  [...document.querySelectorAll('.movements__row')].forEach(function (
    row,
    index
  ) {
    // 0, 2, 4, 6
    if (index % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (index % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/

///////////////////////////////////////
// Math and Rounding
// VIDEO171
/*

// Square Root - Math.sqrt() and by multiplication/division
console.log(Math.sqrt(25)); // Return 5
console.log(25 ** (1 / 2)); // Return 5
// Cubic Root
console.log(8 ** (1 / 3)); // Return 2
// Math.max(), Math.min() - Returns the highest/lowest value
// Does type coercion. Does not do parsing of strings
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.min(5, 18, 23, 11, 2));
// Math CONSTANTS
// Math.PI() - Gives us the value for PI
// Using PI to calculate area of a circle
console.log(Math.PI * Number(parseFloat('10px') ** 2));

// Math.random() - Calculate a random number between 0 & 1
// A random 6 sided die roll. 1 through 6
console.log(Math.trunc(Math.random() * 6) + 1);
// Turning random integer generation into a function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(randomInt(1, 6));
console.log(randomInt(1, 100));
console.log(randomInt(6, 10));

// Rounding integers
// Math.trunc()
// Removes any decimal and returns the integer
console.log(Math.trunc(23.9)); // Returns 23

// Math.round()
// Rounds to nearest integer
console.log(Math.round(23.9)); // Returns 24

// Math.ceil()
// Rounds up to next integer
// Negative number move towards 0
console.log(Math.ceil(23.3)); // Returns 24
console.log(Math.ceil(23.9)); // Returns 24
console.log(Math.ceil(-23.3)); // Returns -23

// Math.floor()
// Rounds down to previous integer
// Negative numbers move away from 0
console.log(Math.floor(23.3)); // Returns 23
console.log(Math.floor(23.9)); // Returns 23
console.log(Math.floor(-23.3)); // Returns -24

// Rounding floating points and decimals
// toFixed()
// Rounds a decimal to the decimal position passed into its argument, default 0
// Return type is a string
console.log((2.7).toFixed(0)); // Return 3
console.log((2.7).toFixed(3)); // Return 2.700
console.log((2.345).toFixed(1)); // Return 2.3
console.log((2.345).toFixed(2)); // Return 2.35
console.log((2.345).toFixed(3)); // Return 2.345
console.log(Number((2.345).toFixed(3))); // Return 2.345, but as a NUMBER, not STRING
*/

///////////////////////////////////////
// Converting & Checking Numbers
// VIDEO170
/*
// All numbers are represented internally as floating point numbers.
console.log(23 === 23.0); // Returns true!

// Javascript numbers are stored using binary, which can lead to precision issues
// Binary base 2  - 0, 1
// Normal base 10 - 0 to 9
console.log(0.1 + 0.2); // Returns 0.30000000000000004!
console.log(0.1 + 0.2 === 0.3); // Returns FALSE!

// Conversion
console.log(Number('23'));
console.log(+'23'); // Works due to type coercion

// Parsing
// If string starts with a number Javascript can strip remaining string
// Second argument sets the base for the number (base 2, base 10, etc)

// Parse Int
console.log(Number.parseInt('30px', 10)); // Return 30
console.log(Number.parseInt('e23', 10)); // Return NaN

// Parse String
console.log(Number.parseInt('2.5rem', 10)); // Return n
console.log(Number.parseFloat('2.5rem')); // Return 2.5

// IsNaN - Check if value is not a number
console.log(Number.isNaN(20)); // Return false
console.log(Number.isNaN('20')); // Return false, its a string
console.log(Number.isNaN(Number('20X'))); // Return true, 20X is typecast and stripped
console.log(Number.isNaN(23 / 0)); // Return false

// IsFinite - Best way to check if a value is a number
console.log(Number.isFinite(20)); // Return true
console.log(Number.isFinite('20')); // Return false
console.log(Number.isFinite(+'20')); // Return false
console.log(Number.isFinite(23 / 0)); // Return false
*/
