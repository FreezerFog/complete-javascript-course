'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////
// VIDEO186: Selecting, Creating, and Deleting Elements
/*
////// SELECTING ELEMENTS //////
console.log(document.documentElement); // Selects the document from document, need to do this if we want to edit styles
console.log(document.head); // Selects head from document
console.log(document.body); // Selects body from document

const header = document.querySelector('.header'); // Selects first Node that matches
const allSections = document.querySelectorAll('.section'); // Returns NodeList with all matching nodes
console.log(allSections);

document.getElementById('#section--1'); // Selects first Node that matches
const allButtons = document.getElementsByTagName('button'); // Returns HTMLCollection with all elements with matching name
console.log(allButtons);

document.getElementsByClassName('btn'); // Returns HTMLCollection with all matches
console.log(document.getElementsByClassName('btn'));

// NodeLists do not automatically update when an item is added/removed
// HTMLCollections automatically update when an item is added/removed

////// Creating and inserting elements //////

// insertAdjacentHTML()
// Allows inserting of elements (nodes) into existing parent HTML element (node)
// <parent_element_name>.insertAdjacentHTML(position, text)
// position parameter: accepts string for declaring where new elements should go
// text parameter: accepts HTML or XML to be inserted into DOM tree

// createElement()
// Creates HTML element
// createElement(tagName, [options])
// tagName parameter: accepts name of the HTML tag such as p, img, div
// options: accepts json for stuff
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
console.log(message);

// prepend()
// Adds node item to element as its new first child
header.prepend(message);

// append()
// Adds node to element as its new last child
// header.append(message);

// before()
// Inserts node to DOM before the element as a sibling
// header.before(message);

// after()
// Inserts node to DOM after the element as a sibling
// header.after(message);

// cloneNode()
// Nodes default behavior is to only have one unique node at a time, so if you want multiple copies of the same node you must clone the node.
// header.prepend(message);
// header.append(message.cloneNode(true)); // Makes copy of node, allowing 2!

////// Delete Elements //////

// remove()
// removes element from the tree it belongs to
// relatively new, before we had to use removeChild() instead
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// removeChild()
// removes element from the tree by accessing parent and removing as a child
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.parentElement.removeChild(message);
//   });
*/
