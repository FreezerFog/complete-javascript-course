'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// API URL TO USE
// https://restcountries.com/v2/

///////////////////////////////////////////////////////////
// VIDEO265 - Running Promises in Parallel

// Calling promises one at a time makes each promise wait for the prior one to finish
// Running promises concurrently is much faster than running them in sequence
// Combinators, like Promise.all(), allow us to run promises concurrently
// A failed Promise.all() will reject ALL of the promises it is handling

async function getCountries(c1, c2, c3) {
  try {
    // EFFICIENT, promises are concurrently fetched
    // A single rejection will cause all to be rejected
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));

    // VERY INEFFICIENT
    // The promises must happen in sequence, rather than concurrently
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);
  } catch (err) {
    console.error(err);
  }
}
// getCountries('portugal', 'canada', 'tanzania');

///////////////////////////////////////////////////////////
////// Testing arrays with Promise.all() //////
async function getCountries2(countries) {
  try {
    let pendingPromises = [];
    countries.forEach(country => {
      pendingPromises.push(
        getJSON(`https://restcountries.com/v2/name/${country}`)
      );
    });
    const data = await Promise.all(pendingPromises);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
}
getCountries2(['portugal', 'canada', 'tanzania']);
///////////////////////////////////////////////////////////

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
