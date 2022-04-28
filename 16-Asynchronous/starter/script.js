'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// API URL TO USE
// https://restcountries.com/v2/

///////////////////////////////////////////////////////////
// VIDEO261 - Consuming Promises with Async/Await

// Steps to use async await
// Create an async function by prepending async to function name
// Makes function async, will run its code in the background, then return promise
// Can have one or more await statements inside an async function
// Await stops the function where called, and waits until it is fulfilled before proceeding
// Await runs in Web API area, not main thread, so it does NOT block main thread running
// Async/Await is syntactic sugar over then() method of promises

// Promises using await. Is syntactic sugar for then()
//    const response = await fetch(`https://restcountries.com/v2/name/${country}`);
//    const dataCountry = await response.json();
// Works the same as then() method of consuming promises:
//    fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res));

// New method of consuming promises. See whereAmI function below for old method
async function whereAmI() {
  // Geolocation Web API
  const position = await getPosition();
  const { latitude: lat, longitude: lng } = position.coords;

  // Reverse Geocoding API
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  // Country Info API
  const resCountry = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.country}`
  );
  const dataCountry = await resCountry.json();
  renderCountry(dataCountry[0]);
  renderContainer();
}
whereAmI();
console.log('HI');

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Old method of consuming promises using then()
// function whereAmI() {
//   getPosition()
//     .then(position => {
//       const { latitude: lat, longitude: lng } = position.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       if (response.status === 403)
//         throw new Error('Too many requests. Please wait');
//       if (!response.ok)
//         throw new Error(`Something went wrong: (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       if (data.error?.code === '018') throw new Error('Coordinates not valid');
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Something went wrong: (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.error(`Error: ${err.message} 🎁`);
//       renderError(`Error: ${err.message} 🎁`);
//       renderContainer();
//     })
//     .finally(renderContainer());
// }

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

btn.addEventListener('click', whereAmI);
