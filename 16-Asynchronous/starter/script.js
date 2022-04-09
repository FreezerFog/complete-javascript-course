'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// API URL TO USE
// https://restcountries.com/v2/

///////////////////////////////////////////////////////////
// VIDEO254 - Handling Rejected Promises

// 2 ways to deal with rejected promises:
// Option 1: then() callbacks with each then() method
// Option 2: catch() at end of fetch() chain to handle all errors

// then(), catch(), and finally() run on fetch() when promise is settled as:
// then() only on fulfilled
// catch() only on rejected
// finally() always!

// finally()
// This callback function will always execute on a fetch() request
// Often used for hiding 'spinners' that indicate a website is loading something

// Option 1 Example
// then() accepts 2 callback functions. The 1st for fulfilled, 2nd for rejected
//    .then(
//      response => response.json(),
//      err => alert(err)
//    )

// Option 2 Example
// catch() as seen below
function getCountryData(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} :(`);
      renderError(`Something went wrong: ${err.message}. Try again!`);
    })
    .finally(() => {
      renderContainer();
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
}

function renderContainer() {
  countriesContainer.style.opacity = 1;
}

function renderError(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
}

btn.addEventListener('click', function () {
  getCountryData('germany');
});
