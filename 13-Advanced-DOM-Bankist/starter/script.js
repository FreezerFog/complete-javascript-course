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
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
logo.setAttribute('company', 'Bankist'); // Sets 'company' to 'Bankist'

///////////////////////////////////////////////////////////
// VIDEO187: Styles, Attributes, Classes
/*
////// Styles //////

// Setting inline styles using .style
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
const logo = document.querySelector('.nav__logo');

// Setting a style using .setProperty()
// message.style.setProperty('background-color', 'blue');

// Getting a style from the DOM
// .style will let us read inline styles only. No styles from CSS files
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// Setting a style after we find it in the DOM
// parseFloat strips the 'px' from the read property, then we add it back on
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// CSS Custom Properties (CSS Variables)
// We can change the CSS custom properties of our css file using .setProperty()
// document.documentElement.style.setProperty('--color-primary', 'orangered');

////// Attributes //////
// We can read the standard attributes of DOM elements using their name as a method
const logo = document.querySelector('.nav__logo');

// Standard
console.log(logo.alt); // Returns the alt value
console.log(logo.src); // Returns the absolute src value
console.log(logo.className); // Returns the class value

logo.alt = 'Beautiful logo'; // Set alt to 'Beautiful logo'
console.log(logo.getAttribute('src')); // Returns relative value for src

// Non-standard
console.log(logo.designer); // Does not work, designer is not a standard attr
console.log(logo.getAttribute('designer')); // Returns 'Jonas'
logo.setAttribute('company', 'Bankist'); // Sets 'company' to 'Bankist'

// Use getAttribute for all links and paths, such as for image sources or hyperlinks

////// Data Attributes //////
// Useful for storing data in the HTML and user interface

// .dataset
// Reads data attribute of the DOM element that invokes it
// Data attribute naming convention in the HTML file is kebab-case
// Follow the word data with the name of the data attribute you want: data-name
// HTML Name Example: data-version-number
// Use camelCase to call attribute: logo.dataset.versionNumber
console.log(logo.dataset.versionNumber);

////// Classes //////
logo.classList.add('c', 'blah');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// DO NOT USE. Overrides all existing classes on the DOM element
// logo.className = 'jonas';
*/

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
