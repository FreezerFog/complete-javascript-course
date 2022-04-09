'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// API URL TO USE
// https://restcountries.com/v2/

///////////////////////////////////////////////////////////
// VIDEO251 - Promises and the Fetch API
// VIDEO252 - Consuming Promises

// fetch() API with explanations
// function getCountryData(country) {
//   // fetch() returns a promise, which will first be pending, but will then be fulfilled
//   // then() allows us to deal with the settled states of fulfilled and rejected
//   // then() accepts a callback function to be executed when promise is settled
//   // then() callback function accepts the response as it's only parameter
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       // json() is a method that's available on all responses from the fetch method
//       // json() is also an asynchronous function. It returns a new promise with its data.
//       return response.json();
//     })
//     .then(function (data) {
//       // This 2nd then() allows us to use data from previous then() json() call
//       renderCountry(data[0]);
//     });
// }

// fetch() API refactored for simplicity using arrow functions
function getCountryData(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
}

function renderCountry(data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

getCountryData('portugal');

///////////////////////////////////////////////////////////
// VIDEO248 - AJAX with XMLHttpRequest
// VIDEO250 - Callback Hell
/*
// OLD SCHOOL AJAX WAY
function getCountryData(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);
  });
}

function renderCountry(data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

// getCountryData('chile');
// getCountryData('usa');
// getCountryData('new zealand');

// Callback Hell!
function getCountryAndNeighbor(country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    // Render country 1
    renderCountry(data);

    // Get neighbor country 2
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      // Render country 2
      renderCountry(data2, 'neighbour');
    });
  });
}

getCountryAndNeighbor('portugal');
*/
