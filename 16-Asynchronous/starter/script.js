'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// API URL TO USE
// https://restcountries.com/v2/

///////////////////////////////////////////////////////////
// VIDEO264 - Returning Values from Async Functions

// Async functions always return a promise
// If we try to assign a variable to an async function's return value then it will show as a promise pending, NOT the fullfilled promise's return value
// To get the fullfilled promise's return value use .then(), .catch(), & .finally()
// An error will cause the promise to terminate before it reaches a return. To avoid this throw an error when found and deal with the return value as appropriate there
// Examples below:

//////  Returning Values with .then() & .catch() //////
async function testReturn() {
  try {
    // FULFILLED
    const var1 = 0;
    var1 = 2; // Turn ON/OFF to test fulfilled/rejected promise
    return 'HI';
  } catch (err) {
    // REJECTED
    // Need to throw error to enable catch later
    throw err;
  }
}
console.log('1: Begin test');
testReturn()
  .then(msg => console.log(`2: ${msg}`))
  .catch(err => console.error(`2: Whoops: ${err.message}`))
  .finally(() => console.log('3: Finally'));
// Success returns '2: HI'
// Rejection returns "2: Whoops: ..."
// Always returns '3: Finally' at the end

////// Returning values with async await //////
// Converting example above into an async await function using an IFFY
(async function () {
  // ALWAYS
  console.log('1: IFFY');
  try {
    // FULFILLED
    const msg = await testReturn();
    console.log(`2: IFFY SUCCESS ${msg}`);
  } catch (err) {
    // REJECTED
    console.error(`2: IFFY ERROR: ${err.message}`);
  }
  // ALWAYS
  console.log('3: IFFY END');
})();
// Always returns '1: IFFY
// Success returns '2: IFFY SUCCESS'
// Rejection returns "2: IFFY ERROR: ..."
// Always returns '3: IFFY END'

////// End Examples //////

async function whereAmI() {
  try {
    // Geolocation Web API
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse Geocoding API
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country Info API
    const resCountry = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!resCountry.ok) throw new Error('Problem getting country');
    const dataCountry = await resCountry.json();

    // Rendering Country
    renderCountry(dataCountry[0]);
    renderContainer();
    return 'HI';
  } catch (err) {
    renderError(`😫 ${err.message}`);
  }
}

whereAmI();

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

function getCountryData(country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found');
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
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

btn.addEventListener('click', whereAmI);
