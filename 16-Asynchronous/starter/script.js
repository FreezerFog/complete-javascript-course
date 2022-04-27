'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// API URL TO USE
// https://restcountries.com/v2/

///////////////////////////////////////////////////////////
// VIDEO259 - Building a Simple Promise

// Promises accept 1 argument called the 'executor function'
// The executor function will run immediately when the Promise is called
// The executor function accepts 2 arguments: a resolve & reject function (named whatever)
// The executor function contains the asynch behavior that we want to handle in the promise
// The executor function should eventually produce a result value for the promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Waiting for draw...');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // resolve() sets the result of the promise to fulfilled (aka resolved)
      // Whatever we pass into the resolve() function will become the result that will be used
      // in the .then() handler of the promise
      resolve('You Win 🦑');
    } else {
      // reject sets the result of the promise to rejected
      reject(new Error('You LOSE 😟'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying
// Act of putting a promise inside of a callback function
// Promisifying setTimeout callback function
// Makes a function work like the fetch() function, by returning a promise
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const waitAF = function (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

wait(3).then(res => console.log('Wait!'));
waitAF(5).then(res => console.log('Wait AF!'));

wait(7)
  .then(() => {
    console.log('I waited for 7 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

// Immediately Resolving or Rejecting a Promise()
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

function getCountryData(country) {
  // Country 1
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

btn.addEventListener('click', function () {
  getCountryData('portugal');
});
