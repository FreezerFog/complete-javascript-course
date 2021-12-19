'use strict';

// DOM
const playerZeroScoreTotalElem = document.getElementById('score--0');
const playerZeroScoreCurrentElem = document.getElementById('current--0');
const playerOneScoreTotalElem = document.getElementById('score--1');
const playerOneScoreCurrentElem = document.getElementById('current--1');
const diceElem = document.querySelector('.dice');
const btnRollDiceElem = document.querySelector('.btn--roll');
const btnNewGameElem = document.querySelector('.btn--new');
const btnHoldElem = document.querySelector('.btn--hold');
const playerZeroElem = document.querySelector('.player--0');
const playerOneElem = document.querySelector('.player--1');

// Variables
let playerZeroCurrentScore = 0;
let playerOneCurrentScore = 0;
let activePlayer = 0;
const scores = [0, 0];

// Event Listeners
btnRollDiceElem.addEventListener('click', rollDice);
btnHoldElem.addEventListener('click', hold);
btnNewGameElem.addEventListener('click', newGame);

// Functions
function setPlayerTotalScore(player) {
  if (player === 0) {
    scores[0] += playerZeroCurrentScore;
    playerZeroScoreTotalElem.textContent = scores[0];
  } else {
    scores[1] += playerOneCurrentScore;
    playerOneScoreTotalElem.textContent = scores[1];
  }
}

function setPlayerCurrentScore(player, roll) {
  if (player === 0) {
    playerZeroCurrentScore += roll;
    playerZeroScoreCurrentElem.textContent = playerZeroCurrentScore;
  } else {
    playerOneCurrentScore += roll;
    playerOneScoreCurrentElem.textContent = playerOneCurrentScore;
  }
}

function rolledOne(player) {
  if (player === 0) {
    playerZeroCurrentScore = 0;
    playerZeroScoreCurrentElem.textContent = playerZeroCurrentScore;
  } else {
    playerOneCurrentScore = 0;
    playerOneScoreCurrentElem.textContent = playerOneCurrentScore;
  }
}

function showDice() {
  diceElem.classList.remove('hidden');
}

function hideDice() {
  diceElem.classList.add('hidden');
}

function toggleTurn() {
  playerZeroElem.classList.toggle('player--active');
  playerOneElem.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function rollDice() {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  diceElem.src = `dice-${diceRoll}.png`;
  showDice();

  if (diceRoll !== 1) {
    setPlayerCurrentScore(activePlayer, diceRoll);
  } else {
    rolledOne(activePlayer);
    toggleTurn();
  }
}

function hold() {
  setPlayerTotalScore(activePlayer);

  if (activePlayer === 0) {
    playerZeroCurrentScore = 0;
    playerZeroScoreCurrentElem.textContent = playerZeroCurrentScore;
  } else {
    playerOneCurrentScore = 0;
    playerOneScoreCurrentElem.textContent = playerOneCurrentScore;
  }

  if (!winCheck(activePlayer)) {
    toggleTurn();
  }
}

function winCheck(player) {
  if (scores[player] >= 100) {
    if (player === 0) {
      playerZeroElem.classList.toggle('player--winner');
    } else {
      playerOneElem.classList.toggle('player--winner');
    }
    btnRollDiceElem.setAttribute('disabled', true);
    btnHoldElem.setAttribute('disabled', true);
    hideDice();
    return true;
  } else {
    return false;
  }
}

function newGame() {
  playerZeroCurrentScore = 0;
  playerOneCurrentScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  playerZeroElem.classList.remove('player--winner');
  playerOneElem.classList.remove('player--winner');
  playerZeroElem.classList.add('player--active');
  playerOneElem.classList.remove('player--active');
  btnRollDiceElem.removeAttribute('disabled');
  btnHoldElem.removeAttribute('disabled');
  playerZeroScoreCurrentElem.textContent = playerZeroCurrentScore;
  playerOneScoreCurrentElem.textContent = playerOneCurrentScore;
  playerZeroScoreTotalElem.textContent = scores[0];
  playerOneScoreTotalElem.textContent = scores[1];
  hideDice();
}

// Starting Conditions
setPlayerTotalScore(0);
setPlayerTotalScore(1);
hideDice();
