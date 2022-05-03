'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// API URL TO USE
// https://restcountries.com/v2/

///////////////////////////////////////////////////////////
// VIDEO266 - Other Promise Combinators: race, allSettled and any

// All combinators receive an array of promises and return a promise

// Promise.race()
// Settled as soon as a single promise is settled (e.g rejected or fulfilled)
// If first result is fulfilled .race() will return value of the specific fulfilled promise
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/spain`),
    getJSON(`https://restcountries.com/v2/name/france`),
  ]);
  console.log(res[0]);
})();

Promise.race([getJSON(`https://restcountries.com/v2/name/canada`), timeout(1)])
  .then(data => console.log(data[0]))
  .catch(err => console.error(`Error: ${err.message}`));

// Promise.allSettled()
// Returns array of all settled promises (e.g both fulfilled & rejected are returned)
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.resolve('Success 2'),
  Promise.reject('ERROR'),
  Promise.resolve('Success 3'),
  Promise.reject('ERROR 2'),
]).then(res => console.log(res));

// Promise.any()
// Returns the first fullfilled promise (ignores rejections)
Promise.any([
  Promise.resolve('Success'),
  Promise.resolve('Success 2'),
  Promise.reject('ERROR'),
  Promise.resolve('Success 3'),
  Promise.reject('ERROR 2'),
]).then(res => console.log(res));

// Function that returns a rejection and error if time is reached
function timeout(seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, seconds * 1000);
  });
}

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

function getJSON(url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
}

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
