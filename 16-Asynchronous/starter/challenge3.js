'use strict';

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

////// PART 1 //////
const imgContainer = document.querySelector('.images');

function createImage(imgPath) {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;

    newImg.addEventListener('load', function () {
      imgContainer.append(newImg);
      return resolve(newImg);
    });

    newImg.addEventListener('error', function () {
      return reject(new Error('Image not found'));
    });
  });
}

function wait(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}

function hideImg(img) {
  img.style.display = 'none';
}

async function loadNPause() {
  try {
    // Image 1
    let img = await createImage('./img/img-1.jpg');
    await wait(2);
    hideImg(img);

    // Image 2
    img = await createImage('./img/img-2.jpg');
    await wait(2);
    hideImg(img);

    // Image 3
    img = await createImage('./img/img-3.jpg');
    await wait(2);
  } catch (err) {
    console.error(err);
  }
}
// loadNPause();

////// Part 2 //////

// MY WAY
async function loadAll(imgArr) {
  try {
    const imgsEl = await Promise.all(imgArr.map(createImage));
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
}

// MY WAY 2
// async function loadAll(imgArr) {
//   try {
//     // Async/await needed in order to have access to imgEl value for adding the class
//     imgArr.forEach(async img => {
//       const imgEl = await createImage(img);
//       imgEl.classList.add('parallel');
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

// JONAS WAY
// async function loadAll(imgArr) {
//   try {
//     // Creates an array of promises
//     // Will need async/await on createImage() if we want to do work (like adding the 'parallel' class) on the img inside the map block because it is a promise
//     const imgs = imgArr.map(async img => await createImage(img));
//     // Then, call all promises from the new array
//     const imgsEl = await Promise.all(imgs);
//     imgsEl.forEach(img => {
//       img.classList.add('parallel');
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
