'use strict';

///////////////////////////////////////////////////////////
// DOM Elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const imgTargets = document.querySelectorAll('img[data-src]');

///////////////////////////////////////////////////////////
// Modal window
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
// Page Navigation
// Nav Links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Scrolling to #section--1
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////////////////
// Tabbed Components
tabsContainer.addEventListener('click', function (event) {
  const clicked = event.target.closest('.operations__tab');
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Activate tab and content area
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////// Menu Fade Animation //////
function handleHover(event, opacity) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
}

nav.addEventListener('mouseover', function (event) {
  handleHover(event, 0.5);
});

nav.addEventListener('mouseout', function (event) {
  handleHover(event, 1);
});

////// Sticky Navbar //////
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

////// Revealing Site Sections //////
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////// Lazy Loading Feature Images //////
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

////// Slider Component //////
function slider() {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length - 1;

  init();

  ////// Functions //////
  function init() {
    // Set Starting Slide
    goToSlide(0);
    // Create Dots
    createDots();
    // Set Starting Dot
    activateDot(0);
  }

  function goToSlide(slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  }

  function nextSlide() {
    currentSlide = currentSlide === maxSlide ? 0 : currentSlide + 1;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  function previousSlide() {
    currentSlide = currentSlide === 0 ? maxSlide : currentSlide - 1;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  function createDots() {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  function activateDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  ////// Event Listeners //////
  // Go To Next Slide
  btnRight.addEventListener('click', nextSlide);

  // Go To Previous Slide
  btnLeft.addEventListener('click', previousSlide);

  // Navigate Slider Using Keys
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') previousSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Select Slide Using Dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      console.log(slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
}
slider();

///////////////////////////////////////////////////////////
// VIDEO200: Building a Slider Component: Part 1
/*
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currentSlide = 0;
const maxSlide = slides.length - 1;

function goToSlide(slide) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`)
  );
}

goToSlide(0);

function nextSlide() {
  currentSlide = currentSlide === maxSlide ? 0 : currentSlide + 1;
  goToSlide(currentSlide);
}

function previousSlide() {
  currentSlide = currentSlide === 0 ? maxSlide : currentSlide - 1;
  goToSlide(currentSlide);
}

// Next Slide
btnRight.addEventListener('click', nextSlide);

// Previous Slide
btnLeft.addEventListener('click', previousSlide);
*/

///////////////////////////////////////////////////////////
// VIDEO199: Lazy Loading Images
/*
////// Lazy Loading Images //////
// Select all images with a data-src property
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // Remove our blur effect only AFTER the good image has loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  // Stop observing the image now that we're done with it
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});
imgTargets.forEach(img => imgObserver.observe(img));
*/

///////////////////////////////////////////////////////////
// VIDEO198: Revealing Elements on Scroll
/*
////// Reveal Sections //////
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
/*

///////////////////////////////////////////////////////////
// VIDEO197: A Better Way: The Intersection Observer API
/*
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

// Gets the height of the nav bar, no matter the viewport or change from responsive design
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
*/

///////////////////////////////////////////////////////////
// VIDEO196: Implementing a Sticky Navigation: The Scroll Event
/*
////// Sticky Navigation //////
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function () {
  console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/

///////////////////////////////////////////////////////////
// VIDEO195: Passing Arguments to Event Handlers
/*
////// Menu fade animation //////
// mouseover & mouseout bubble, allowing for event propagation
// mouseenter & mouseleave do not bubble

// function handleHover(event, opacity) {
//   if (event.target.classList.contains('nav__link')) {
//     const link = event.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) {
//         el.style.opacity = opacity;
//       }
//       logo.style.opacity = opacity;
//     });
//   }
// }

// nav.addEventListener('mouseover', function (event) {
//   handleHover(event, 0.5);
// });

// nav.addEventListener('mouseout', function (event) {
//   handleHover(event, 1);
// });

////// Passing "argument" into handler //////
// Use bind to place a function with an argurment in the eventListener callback function
// Alternative to above, where we had to call handleHover in the callback function

// Bind sets 'this' keyword to the provided value
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));

// The function in the eventListener callback still gets access to the event value
// due to being a parameter of the eventListener function
// function handleHover(event) {
//   if (event.target.classList.contains('nav__link')) {
//     const link = event.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) {
//         el.style.opacity = this;
//       }
//       logo.style.opacity = this;
//     });
//   }
// }
*/

///////////////////////////////////////////////////////////
// VIDEO194: Building a Tabbed Component
/*
////// Tabbed Component ///////
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (event) {
  // Need to work around the span tag inside the operations tab
  // We identify the closest operations tab to ensure that our HTML element
  // is an operations tab, no matter if we click on the span or the tab
  const clicked = event.target.closest('.operations__tab');

  // Guard clause, modern way of avoiding null issues
  if (!clicked) return;

  // Traditional way of avoiding a null error
  // if (clicked) {
  //   clicked.classList.add('operations__tab--active');
  // }

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Activate tab and content area
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
*/

///////////////////////////////////////////////////////////
// VIDEO193: DOM Traversing
/*
const h1 = document.querySelector('h1');

////// Going downwards: children //////
// .querySelector() & .querySelectorAll()
// Searches for matching children no matter how descendant they are
// Does not search parents or siblings
console.log(h1.querySelectorAll('.highlight'));

// .childNodes
// Gives all child nodes
console.log(h1.childNodes);

// .children
// Gives an HTML collection of the direct children (no grandkids)
console.log(h1.children);

// .firstElementChild & .lastElementChild
// Access either the first or last child of the parent we call it on
h1.firstElementChild.style.color = 'blue';
h1.lastElementChild.style.color = 'red';

////// Going upwards: parents //////
// .parentNode
// Gives the direct parent Node
console.log(h1.parentNode);

// .parentElement
// Gives the direct parent element
console.log(h1.parentElement);

// .closest()
// Returns nearest element matching argument string
// Will travel up parents to look for a match
// Will return itself if it matches the string
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

////// Sideways: siblings //////
// The standard methods are only able to access direct siblings (previous or next), but there is a workaround
// Sibling Elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// Sibling Nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// Workaround to accessing all siblings
// Navigate up to the parent, then call .children or .childNodes
// Will return all children, including the element you navigated from
console.log(h1.parentElement.children);

// Practice for changing all siblings and excluding the original element
// Step 1: Spread the HTMLCollection into an array
// Step 2: Loop through each element
// Step 3: Perform comparison as needed, and do work as needed
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });

// My Practice: Make a function that performs a passed in function to all siblings
function affectSiblings(element, desiredFunc) {
  [...element.parentElement.children].forEach(function (el) {
    if (el !== element) {
      // el.style.transform = 'scale(0.5)';
      desiredFunc(el);
    }
  });
}
function changeScale(el) {
  el.style.transform = 'scale(0.8)';
}
affectSiblings(h1, changeScale);
*/

///////////////////////////////////////////////////////////
// VIDEO192: Event Delegation: Implementing Page Navigation
/*
// Page navigation
// Enabling smooth delegation on all nav links

// Via a function on each target
// Not efficient, a callback function is created for each link
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     // Prevent behavior of navigating to the anchor id of the element
//     e.preventDefault();
//     // Getting the href of the element
//     const id = this.getAttribute('href');
//     // Selecting the id and scrolling to it
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Via event delegation
// More efficient, only one callback function is needed on the common parent
// Step 1: Add event listener to common parent element of target
// Step 2: Determine what element originated the event (the target)
// Step 3: Match, only perform actions on the targets we want
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // Prevent behavior of navigating to the anchor id of the element
  e.preventDefault();
  // Determine the target using e.target, then match the target based on a class name
  if (e.target.classList.contains('nav__link')) {
    // Getting the href of the element
    const id = e.target.getAttribute('href');
    // Selecting the id and scrolling to it
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
*/

///////////////////////////////////////////////////////////
// VIDEO191: Event Propagation: Bubbling and Capturing
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget);

  // Stopping propagation (bubbling)
  // Generally not a good idea to use this, but it can help sometimes
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Links Container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('Nav', e.target, e.currentTarget);
    // We can pass in a boolean third argument of true to make this event occur on the capturing phase instead of the bubbling phase
  },
  true
);

// e.target will show the target where the event is first called. Will be the SAME as event bubbling occurs
// e.currentTarget will show the current target an event is called on. Will be DIFFERENT due to event bubbling
// this & currentTarget are the same.
//
*/

///////////////////////////////////////////////////////////
// VIDEO189: Types of Events and Event Handlers
/*
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Heading!');
  removeEvent(h1, 'mouseenter', alertH1);
};

////// Adding an event listener to an element //////

// .addEventListener()
// Newer way of adding a listener
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Heading!');
// });

h1.addEventListener('mouseenter', alertH1);

// .onmouseenter
// Old way of adding a listener
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Heading!');
// };

////// Removing an event listener //////

// .removeEventListener()
// Works similarly to .addEventListener()
// In order to remove an eventListener the event needs to have a non-anonymous function.
// The first example of .addEventListener would not work, but the second one will because
// we can specify the exact listener that should be removed: mouseenter & alertH1

// I made this a function for reusability sake. Example of remove is inside the function
function removeEvent(element, event, eventFunction) {
  element.removeEventListener(event, eventFunction);
}
*/

///////////////////////////////////////////////////////////
// VIDEO188: Implementing Smooth Scrolling
/*
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // Scrolling
  // We add the current window offset to the coordinates of our target so that we will always have the right x/y coordinate to scroll the window to.

  // Old school method
  // Scrolling with x/y argument
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // Scrolling with object argument
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // New method, works as above
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/

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
