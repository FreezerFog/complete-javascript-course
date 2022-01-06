'use strict';

const airline = 'TAP Air Portugal';
const plane = 'A320';

// We can manipulate strings like array's
// Getting value from position in string

console.log(plane[0]);
console.log('B737'[1]);

// Length of a string
console.log(airline.length);
console.log('Hello'.length);

// Index of characters in a string
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

// Extract part of string (a substring) using slice
console.log(airline.slice(4));
console.log(airline.slice(4, 7));
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

function checkMiddleSeat(seat) {
  // B & E are middle seats
  const seatCode = seat.slice(-1);

  if (seatCode === 'B' || seatCode === 'E') {
    console.log('You got the middle seat :(');
  } else {
    console.log('You got lucky!');
  }
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// Change case of string
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Fixing case with custom function
function correctNameCasing(name) {
  const nameLower = name.toLowerCase();
  const nameCorrect = nameLower[0].toUpperCase() + nameLower.slice(1);
  return nameCorrect;
}
console.log(correctNameCasing('jOnAS'));

// Comparing emails example
const email = 'hello@jonas.io';
const loginEmail = '  Hello@JOnas.io \n';
// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail ? 'same email' : 'not same email');

// Replacing parts of strings
// replace() is case sensitive
const priceGB = '288,97£'; // Pound sterling
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
// replace() replaces only the first matching character(s)
console.log(announcement.replace('door', 'gate'));
// replaceAll() replaces all found matching characters
console.log(announcement.replaceAll('door', 'gate'));
// Regular expressions also replace all found matches
// string to search for is between // and the g stands for global
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
// includes(), startsWith(), endsWith()
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.includes('Boeing'));
console.log(plane2.startsWith('A320'));
console.log(plane2.startsWith('Airb'));
if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of NEW Airbus family');
}

// Practice exercise
function checkBaggage(items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard');
  }
}

checkBaggage('I have a laptop, some Food, and a pocket Knife');
checkBaggage('Socks and a camera');
checkBaggage('Got some snacks and a gun for protection');

// Split
// Allows us to split a string into multiple parts
console.log('a+very+nice+string'.split('+'));
console.log('Derek Weese'.split(' '));

// Split with some array destructuring to make variables
const [firstName, lastName] = 'Derek Weese'.split(' ');
console.log(`First: ${firstName} Last: ${lastName}`);

// Join
// Allows us to combine an array into a single string
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

// Exercise capitalizing a name
const passenger2 = 'jessica ann smith davis';

function capitalizeNames(fullName) {
  const names = fullName.split(' ');
  let namesCapitalized = [];
  for (const n of names) {
    // namesCapitalized.push(n[0].toUpperCase() + n.slice(1));
    namesCapitalized.push(n.replace(n[0], n[0].toUpperCase()));
  }
  return namesCapitalized.join(' ');
}

console.log(capitalizeNames('jessica ann smith davis'));
console.log(capitalizeNames('derek joe weese'));

// Padding a string
// padStart(), padEnd()
const message = 'Go to gate 23';
console.log(message.padStart(25, '+'));
console.log('Derek'.padStart(25, '+'));
console.log(message.padStart(25, '+').padEnd(30, '+'));
console.log('Derek'.padStart(25, '+').padEnd(30, '+'));

// Example of padding in the real world
function maskCreditCard(number) {
  const str = String(number);
  const lastFour = str.slice(-4);
  return lastFour.padStart(str.length, '#');
}

console.log(maskCreditCard(4444555566667777));
console.log(maskCreditCard('88725290219112309890132'));

// Repeat
// Repeat a string multiple times
const message2 = 'Bad weather... all departures delayed... \n';
console.log(message2.repeat(5));
function planesInLine(numOfPlanes) {
  return `There are ${numOfPlanes} planes in line ${'✈️'.repeat(numOfPlanes)}`;
}
console.log(planesInLine(3));
