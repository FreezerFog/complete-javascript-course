'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// My Practice: Using a class to make an account template
class BankAccount {
  constructor(owner, movements, interestRate, pin) {
    this.owner = owner;
    this.movements = movements;
    this.interestRate = interestRate;
    this.pin = pin;
  }
}

const jonas = new BankAccount(
  'Jonas Schmedtmann',
  [200, 450, -400, 3000, -650, -130, 70, 1300],
  1.2,
  1111
);

const jessica = new BankAccount(
  'Jessica Davis',
  [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  1.5,
  2222
);

const steven = new BankAccount(
  'Steven Thomas Williams',
  [200, -200, 340, -300, -20, 50, 400, -460],
  0.7,
  3333
);

const sarah = new BankAccount('Sarah Smith', [430, 1000, 700, 50, 90], 1, 4444);
const bankAccounts = [jonas, steven, jessica, sarah];
// END MY CLASS PRACTICE

/* Jonas Original Data
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
*/

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

function calcDisplayBalance(account) {
  // Assign new balance & amount key/value pair to account
  account.balance = account.movements.reduce((total, mov) => total + mov, 0);
  labelBalance.textContent = `${account.balance}€`;
}

function calcDisplaySummary(account) {
  const totalSumIn = account.movements
    .filter(deposit => deposit > 0)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumIn.textContent = `${totalSumIn}€`;

  const totalSumOut = account.movements
    .filter(withdrawal => withdrawal < 0)
    .reduce((acc, withdrawal) => acc + withdrawal, 0);
  labelSumOut.textContent = `${Math.abs(totalSumOut)}€`;

  const interestPerDeposit = account.interestRate / 100;
  const minimumInterestToQualifyForPayment = 1;
  const interest = account.movements
    .filter(deposit => deposit > 0)
    .map(deposit => deposit * interestPerDeposit)
    .filter(payment => payment > minimumInterestToQualifyForPayment)
    .reduce((acc, interestYield) => acc + interestYield, 0);
  labelSumInterest.textContent = `${interest}€`;
}

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
createUsernames(bankAccounts);

function displayMovements(account, sort = false) {
  // Remove any existing elements from the amounts container
  containerMovements.innerHTML = '';

  const accountMovements = sort
    ? sortMovementsAscending(account)
    : account.movements;

  accountMovements.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${index + 1} ${type}
        </div>
        <div class="movements__date">Date Unavailable</div>
        <div class="movements__value">
          ${movement}€
        </div>
      </div>
      `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function displayUI() {
  // Displays welcome message here
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }`;
  containerApp.style.opacity = 100;
}

function clearUI() {
  labelWelcome.textContent = `Log in to get started`;
  containerApp.style.opacity = 0;
}

function updateUI(account) {
  displayMovements(account);
  calcDisplaySummary(account);
  calcDisplayBalance(account);
}

function clearInputs() {
  // Clear login inputs
  inputLoginUsername.value = inputLoginPin.value = '';
  // Clears transfer inputs
  inputTransferAmount.value = inputTransferTo.value = '';
  // Clear close account inputs
  inputCloseUsername.value = inputClosePin.value = '';
  // Clear loan request input
  inputLoanAmount.value = '';
  // Removes focus from all input fields
  document.activeElement.blur();
}

function transferDebitWithdrawer(account, amount) {
  account.movements.push(-amount);
}

function transferCreditReceiver(account, amount) {
  account.movements.push(amount);
}

function sortMovementsAscending(account) {
  return account.movements.slice().sort((a, b) => a - b);
}

function closeBankAccount(currentAccount) {
  bankAccounts.splice(
    bankAccounts.findIndex(acc => acc === currentAccount),
    1
  );
}

// Event Handlers
let currentAccount;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  currentAccount = bankAccounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    displayUI();
    clearInputs();
    updateUI(currentAccount);
  }
});

// Transfer funds from one account to another
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amountToTransfer = Number(inputTransferAmount.value);
  const receiverAccount = bankAccounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amountToTransfer > 0 &&
    receiverAccount &&
    currentAccount.balance >= amountToTransfer &&
    receiverAccount?.username !== currentAccount.username
  ) {
    transferDebitWithdrawer(currentAccount, amountToTransfer);
    transferCreditReceiver(receiverAccount, amountToTransfer);
    updateUI(currentAccount);
    clearInputs();
  }
});

// Request loan from bank
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const loanRequestAmount = Number(inputLoanAmount.value);
  if (
    loanRequestAmount > 0 &&
    currentAccount.movements.some(acc => acc >= loanRequestAmount * 0.1)
  ) {
    currentAccount.movements.push(loanRequestAmount);
    updateUI(currentAccount);
    clearInputs();
  }
});

let isSorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAccount, !isSorted);
  isSorted = !isSorted;
});

// Close bank account
btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    closeBankAccount(currentAccount);
    clearInputs();
    clearUI();
  }
});

//
//
//
//
//

/* Array Practice
///////////////////////////////////////
// Array Practice
// VIDEO166

// 1) Get sum of all bank deposits
const bankDepositSum = bankAccounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((total, mov) => total + mov, 0);
console.log(bankDepositSum);

// 2) Count of deposits in the bank that are at least 1,000.
const numDepositsOver1000 = bankAccounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDepositsOver1000);

// 2a) As above, using reduce. Method 1
// const numDepositsOver1000Reduce = bankAccounts.reduce(function (
//   total,
//   account
// ) {
//   return total + account.movements.filter(mov => mov >= 1000).length;
// },
// 0);
// console.log(numDepositsOver1000Reduce);

// 2b) As above, using reduce. Method 2
// const numDepositsOver1000Reduce2 = bankAccounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, mov) => (mov >= 1000 ? ++count : count), 0);
// console.log(numDepositsOver1000Reduce2);

// 3) Create object with sum of deposits and sum of withdrawals
//      Array destructuring to set deposits and withdrawals from object
const { deposits, withdrawals } = bankAccounts
  .flatMap(acc => acc.movements)
  .reduce(
    function (obj, movement) {
      // movement >= 0
      //   ? (obj.deposits += movement)
      //   : (obj.withdrawals += movement);
      // return obj;

      // Same as above, but setting key based on movement value
      obj[movement > 0 ? 'deposits' : 'withdrawals'] += movement;
      return obj;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// Reduce method for allBankDeposits
// const allBankDeposits = bankAccounts.reduce((arr, account) => {
//   arr.push(...account.movements.filter(mov => mov > 0));
//   return arr;
// }, []);
// console.log(allBankDeposits);
// Reduce method for allBankDepositsSum
// const allBankDepositsSumWithReduce = bankAccounts.reduce(function (
//   total,
//   account
// ) {
//   const accountSum = account.movements.reduce(function (sum, movement) {
//     return movement > 0 ? sum + movement : sum;
//   });
//   return total + accountSum;
// },
// 0);
// console.log(allBankDepositsSumWithReduce);

// Convert string to title case
const titleCaseExceptions = [
  'and',
  'but',
  'for',
  'or',
  'nor',
  'with',
  'to',
  'for',
  'at',
  'a',
  'an',
  'the',
  'on',
];

// My solution for title case conversion
function convertToTitleCase(string) {
  const titleCaseExceptions = [
    'and',
    'but',
    'for',
    'or',
    'nor',
    'with',
    'to',
    'for',
    'at',
    'a',
    'an',
    'the',
    'on',
  ];

  const stringArr = string.split(' ');
  const words = stringArr.map(word => {
    word = word.toLowerCase();
    if (!titleCaseExceptions.includes(word)) {
      word = word[0].toUpperCase() + word.slice(1);
    }
    return word;
  });
  return words.join(' ');
}
console.log(convertToTitleCase('wow! What for say you and that man?'));
console.log(convertToTitleCase('this is a nice title'));
console.log(convertToTitleCase('this is a LONG title but not too long'));
console.log(convertToTitleCase('and here is another title with an EXAMPLE'));

// Jonas solution to title case conversion
function convertTitleCaseJonas(title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = [
    'and',
    'but',
    'for',
    'or',
    'nor',
    'with',
    'to',
    'for',
    'at',
    'a',
    'an',
    'the',
    'on',
  ];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
}
console.log(convertTitleCaseJonas('wow! What for say you and that man?'));
console.log(convertTitleCaseJonas('this is a nice title'));
console.log(convertTitleCaseJonas('this is a LONG title but not too long'));
console.log(convertTitleCaseJonas('and here is another title with an EXAMPLE'));
/*

/* // More Ways of Creating and Filling Arrays
///////////////////////////////////////
// More Ways of Creating and Filling Arrays
// VIDEO164

// Fill Method
const y = [1, 2, 3, 4, 5, 6, 7, 8];
const x = new Array(7); // Creates array with 7 empty elements
// x.fill(1);     // Fills each empty element with the number 1
// x.fill(1, 3);  // Fills starting from element 3. Fills remaining elements with 1
// x.fill(1, 3, 5); // Fills starting from element 3, stops at 5. Fills with 1
// console.log(x);
// y.fill(23, 2, 6); // Fills starting from element 2, stops at 6. Fills with 23
// console.log(y);

// Array.from()
// Is not called on an array. It is called on the Array constructor
// First argument it accepts is an array-like or iterable object
// Second argument is a mapping function
// Creates new array with 7 1's
const onesArray = Array.from({ length: 7 }, () => 1);
console.log(onesArray);
// Creates array [1,2,3,4,5,6,7]
const incByOneArray = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(incByOneArray);
// Create array from an iterable
labelBalance.addEventListener('click', function () {
  const movementsFromUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsFromUI);

  // Another way you can get an array from a NodeList
  // Use the ...spread on NodeList to get an array
  // Then call map on it.
  const movementsFromUI2 = [
    ...document.querySelectorAll('.movements__value'),
  ].map(el => Number(el.textContent.replace('€', '')));
  console.log(movementsFromUI2);
});
*/

/* // Sorting Arrays
// Sorting Arrays
///////////////////////////////////////
// Sorting Arrays
// VIDEO163

// Sort Method
// By default sort() treats array elements as strings
// Sort accepts a comparison callback function

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.sort()); // Not what we want, not sorted as numbers

// Sort ASCENDING ORDER
// Return < 0, currentValue, nextValue (keep the order)
// Return > 0, nextValue, currentValue (switch the order)
movements.sort((currentValue, nextValue) => {
  if (currentValue > nextValue) return 1;
  if (currentValue < nextValue) return -1;
});
console.log(movements);
// Same as above!
// will return positive number if current is greater
// will return negative number if current is smaller
movements.sort((currentValue, nextValue) => currentValue - nextValue);
console.log(movements);

// Sort DESCENDING ORDER
// Return > 0, currentValue, nextValue (keep the order)
// Return < 0, nextValue, currentValue (switch the order)
movements.sort((currentValue, nextValue) => {
  if (currentValue > nextValue) return -1;
  if (currentValue < nextValue) return 1;
});
console.log(movements);
// Same as above!
// returns positive number if nextValue is greater than currentValue
// returns negative number if nextValue is less than currentValue
movements.sort((currentValue, nextValue) => nextValue - currentValue);
console.log(movements);
*/

/* // Flat and FlatMap Methods
///////////////////////////////////////
// Flat and FlatMap Methods
// VIDEO162

const multiDimensionalArray = [[1, 2, 3], [4, 5, 6], 7, 8];
const multiMultiDimensionalArray = [[1, [2, 3]], [4, [5, 6]], 7, 8];

// Flat Method
// Returns a new array, where every element in a nested array is taken out of nesting and added as their own elements, in order, in the top level of the array. By default will work with one level deep, and leave remaining nested arrays. Accepts parameter to specify amount of levels deep to flatten. Does not mutate the original array.
console.log(multiDimensionalArray.flat());
console.log(multiDimensionalArray);
console.log(multiMultiDimensionalArray.flat()); // Default 1 level of nesting
console.log(multiMultiDimensionalArray.flat(2)); // 2 levels deep

const allMovementsSum = bankAccounts
  .flatMap(account => account.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(allMovementsSum);

// Flat Map Method
// Combines the map and flat methods in a single method call
// Accepts the same arguments as map(), except final output is flattened like flat()
// flatMap() can only go one level deep
const allMovementsSumFlatMap = bankAccounts
  .flatMap(account => account.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(allMovementsSumFlatMap);
*/

/* // Some and Every Methods
///////////////////////////////////////
// Some and Every Methods
// VIDEO161

// Some Method
// Iterates through an array. Calls callback function for each element. Tests if a condition is true for any SINGLE element. Returns true if yes, false if not.
// Like the includes() method, but allows us to test a condition instead of an equality
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// Every Method
// Iterates through an array. Callback function for each element. Tests if a condition is true for EVERY element. Returns true if yes, false if not.
const allDeposits = movements.every(mov => mov > 0);
console.log(allDeposits);

// Separate callback using a function
// Call deposit function in place of callback function. Allows reusability
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/* // Find Method
///////////////////////////////////////
// Find Method
// VIDEO157

// Find is used to retrieve the first element of an array that passes a condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

// Using find() with an array of objects
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/

/* // Chaining Methods
///////////////////////////////////////
// Chaining Methods
// VIDEO155

// We can chain methods together if the methods return a data type that the next method can work with. Here filter() and map() both expect arrays and return arrays, whereas reduce() expects an array but returns a single number value. If we wanted we could call a number method after the reduce() method.
// We should avoid over chaining arrays. Multiple loops can bring performance issues. Therefore it may be worth it to do multiple steps at a time using if statements, forOf loops, and so on instead.
// We should not chain methods that mutate the original array. It's a bad practice.

const totalDepositsInUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUSD)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsInUSD);
*/

/* // Reduce Method
///////////////////////////////////////
// Reduce Method
// VIDEO153

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

/* // Filter Method
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

/* // Computing Usernames
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

/* // Map Method
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

/* // DOM Elements
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

/* // forEach with Maps and Sets
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

/* // forEach Method
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

/* // At Method
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

/* // Simple Arrau Methods
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
