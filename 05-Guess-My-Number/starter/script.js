'use strict';

/*
let message = document.querySelector('.message');
console.log(message);
message.textContent = 'wow';
console.log(message);
document.querySelector('.message').textContent = 'Wow you win!';
document.querySelector('.number').textContent = 7;
document.querySelector('.score').textContent = 10;
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

// EVENT LISTENER
// Event listeners expect two arguments, an event and a function
// The function can be written right into the argument field, or
// if they have already been written elsewhere we can insert that
// function in that area instead. (Like calcAge() from before)

/*
// The function is written inside the argument field
document.querySelector('.check').addEventListener('click', function () {
  console.log(document.querySelector('.guess').value);
  document.querySelector('.message').textContent = 'Wow you win!';
});
*/

/*
The function has been written, then gets used here. This makes
the function reusable as we could call it with other clicks!
function logTheValue() {
  console.log(document.querySelector('.guess').value);
  document.querySelector('.message').textContent = 'Wow you win!';
}
document.querySelector('.check').addEventListener('click', logTheValue);
*/
function setSecretNumber(number) {
  return Math.trunc(Math.random() * number) + 1;
}

let secretNumber = setSecretNumber(20);
let highScore = 0;
let playerScore = 20;

document.querySelector('.check').addEventListener('click', checkGuess);
// document.querySelector('.check').addEventListener('click', function () {
//   checkGuess();
// });

document.querySelector('.again').addEventListener('click', newGame);
// document.querySelector('.again').addEventListener('click', function () {
//   newGame();
// });

function checkGuess() {
  let userGuess = Number(document.querySelector('.guess').value);

  if (!userGuess) {
    displayMessage('⛔️ No number entered');
  } else if (userGuess === secretNumber) {
    displayMessage('You Win!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (playerScore > highScore) {
      highScore = playerScore;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else {
    if (playerScore > 0) {
      playerScore--;
      document.querySelector('.score').textContent = playerScore;
      displayMessage(userGuess < secretNumber ? 'Too low!' : 'Too high!');
    }
    if (playerScore === 0) displayMessage('You LOSE!');
  }
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function newGame() {
  secretNumber = setSecretNumber(20);
  playerScore = 20;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.highscore').textContent = highScore;
  document.querySelector('.score').textContent = playerScore;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
}
