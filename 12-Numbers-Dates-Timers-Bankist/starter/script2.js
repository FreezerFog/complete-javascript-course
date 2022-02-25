'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// My Practice: Using a class to make an account template
class BankAccount {
  constructor(
    owner,
    movements,
    interestRate,
    pin,
    movementDates,
    currency,
    locale
  ) {
    this.owner = owner;
    this.movements = movements;
    this.interestRate = interestRate;
    this.pin = pin;
    this.movementDates = movementDates;
    this.currency = currency;
    this.locale = locale;
  }
}

const jonas = new BankAccount(
  'Jonas Schmedtmann',
  [200, 450, -400, 3000, -650, -130, 70, 1300],
  1.2,
  1111,
  [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-02-16T10:51:36.790Z',
    '2022-02-18T23:36:17.929Z',
  ],
  'EUR',
  'pt-PT'
);

const jessica = new BankAccount(
  'Jessica Davis',
  [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  1.5,
  2222,
  [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  'USD',
  'en-US'
);

const bankAccounts = [jonas, jessica];
// END MY CLASS PRACTICE

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
  labelBalance.textContent = `${formatCurrency(
    account.balance,
    account.locale,
    account.currency
  )}`;
}

function calcDisplaySummary(account) {
  const totalSumIn = account.movements
    .filter(deposit => deposit > 0)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumIn.textContent = `${formatCurrency(
    totalSumIn,
    account.locale,
    account.currency
  )}`;

  const totalSumOut = account.movements
    .filter(withdrawal => withdrawal < 0)
    .reduce((acc, withdrawal) => acc + withdrawal, 0);
  labelSumOut.textContent = `${formatCurrency(
    Math.abs(totalSumOut),
    account.locale,
    account.currency
  )}`;

  const interestPerDeposit = account.interestRate / 100;
  const minimumInterestToQualifyForPayment = 1;
  const interest = account.movements
    .filter(deposit => deposit > 0)
    .map(deposit => deposit * interestPerDeposit)
    .filter(payment => payment > minimumInterestToQualifyForPayment)
    .reduce((acc, interestYield) => acc + interestYield, 0);
  labelSumInterest.textContent = `${formatCurrency(
    interest,
    account.locale,
    account.currency
  )}`;
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

function movementDateMessage(date, locale) {
  const calcDaysBetween = (date1, date2) => {
    const msBetween = Math.abs(Number(date1) - Number(date2));
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.trunc(msBetween / msPerDay);
  };

  const dateNow = new Date();
  const days = calcDaysBetween(date, dateNow);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days <= 7) return `${days} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
}

function formatCurrency(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

function displayMovements(account, sort = false) {
  // Remove any existing elements from the amounts container
  containerMovements.innerHTML = '';
  const accountMovements = sort
    ? sortMovementsAscending(account)
    : account.movements;

  accountMovements.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.movementDates[index]);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${index + 1} ${type}
        </div>
        <div class="movements__date">${movementDateMessage(
          date,
          account.locale
        )}</div>
        <div class="movements__value">
          ${formatCurrency(movement, account.locale, account.currency)}
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

function displayDate() {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const { locale } = currentAccount;

  labelDate.textContent = `As of ${new Intl.DateTimeFormat(
    locale,
    options
  ).format(now)}`;
}

function clearUI() {
  labelWelcome.textContent = `Log in to get started`;
  containerApp.style.opacity = 0;
}

function updateUI(account) {
  displayMovements(account);
  calcDisplaySummary(account);
  calcDisplayBalance(account);
  displayDate();
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
  account.movementDates.push(new Date().toISOString());
}

function transferCreditReceiver(account, amount) {
  account.movements.push(amount);
  account.movementDates.push(new Date().toISOString());
}

function processLoanRequest(account, loanAmount) {
  if (
    loanAmount > 0 &&
    account.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    clearInputs();
    setTimeout(function () {
      account.movements.push(loanAmount);
      account.movementDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 1500);
  }
}

function sortMovementsAscending(account) {
  return account.movements.slice().sort((a, b) => a - b);
}

function sortMovementDatesAscending(account) {
  return account.movementDates.slice().sort((a, b) => a - b);
}

function closeBankAccount(currentAccount) {
  bankAccounts.splice(
    bankAccounts.findIndex(acc => acc === currentAccount),
    1
  );
}

function startLogOutTimer() {
  if (timer) clearInterval(timer);
  timer = logOutTimer();
}

function logOutTimer() {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the r`emaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
    // When time is at 0, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      clearUI();
      currentAccount = null;
    }
    // Reduce time by 1 second
    time--;
  };
  // Set time to 5 minutes
  let time = 300;
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

// Event Handlers
let currentAccount, timer;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  currentAccount = bankAccounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    startLogOutTimer();
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
    startLogOutTimer();
    clearInputs();
  }
});

// Request loan from bank
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const loanRequestAmount = Number(inputLoanAmount.value);
  processLoanRequest(currentAccount, loanRequestAmount);
  startLogOutTimer();
});

// Sort currentUser movements
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

///////////////////////////////////////
// AUTOMATIC LOG IN FOR EASIER CODING
// currentAccount = bankAccounts[0];
// updateUI(currentAccount);
// displayUI();

// Implementing a Countdown Timer
///////////////////////////////////////
// VIDEO181

/* // Timers: setTimeout and setInterval
///////////////////////////////////////
// VIDEO180

// setTimeout()
// Invokes a callback function after a set period of time
// 1st argument is a callback function
// 2nd argument is an amount of time in milliseconds
// Any arguments beyond the first two become parameters for the callback function
const ingredients = ['Olives', 'Mushrooms'];
const timerExample1 = setTimeout(
  () => console.log('We received your pizza order...'),
  3000
);

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} & ${ing2}`),
  5000,
  ...ingredients
);
// clearTimeout()
// Stops an active setTimeout() timer
if (ingredients.includes('Olives')) clearTimeout(pizzaTimer);

// setInterval()
// Invokes a callback function every 'x' period of time
// 1st argument is a callback function
// 2nd argument is a period of time in milliseconds
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 3000);
*/

/* // Internationalization Numbers(Intl)
///////////////////////////////////////
// VIDEO179

const num = 261823617.47;
const options = {
  style: 'currency',
  currency: 'EUR',
};

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
/*

/* // Operations With Dates
///////////////////////////////////////
// VIDEO177
const future = new Date(2022, 3, 30);
const now = new Date();
console.log(Number(future));
console.log(Number(now));
console.log(Number(future) - Number(now));
const timeBetween = Number(future) - Number(now);
console.log(timeBetween / 24 / 60 / 60 / 1000);
const daysOne = calcDaysPassed(future, now);
console.log(daysOne);
function calcDaysPassed(dateOne, dateTwo) {
  const millisecondsBetween = Math.abs(Number(dateOne) - Number(dateTwo));
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.trunc(millisecondsBetween / millisecondsPerDay);
}
*/

/* // Adding Dates to "Bankist" App
///////////////////////////////////////
// VIDEO176

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const minute = `${now.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `As of ${day}/${month}/${year}, ${hour}:${minute}`;
*/
