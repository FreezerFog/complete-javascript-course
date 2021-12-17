'use strict';

// DOM References
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModal = document.querySelectorAll('.show-modal');

// Global Variables
let modalOn = false;

// Event Listeners
overlay.addEventListener('click', toggleModal);
btnCloseModal.addEventListener('click', toggleModal);
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && modalOn === true) toggleModal();

  // Using class name instead of global variable modalOn
  // if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
  //   toggleModal();
  // }
});

// Adds event listener to each button in the NodeList
for (let i = 0; i < btnsShowModal.length; i++) {
  btnsShowModal[i].addEventListener('click', toggleModal);
}

// Functions
function toggleModal() {
  if (modalOn) {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
  } else {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
  }
  modalOn = modalOn ? false : true;
}
