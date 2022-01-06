'use strict';

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

///////////////////////////////////////
// Beginning HTML for this problem
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const text = document.querySelector('textarea').value;

// Button click event listener
const button = document.querySelector('button');
button.addEventListener('click', getTextAreaContents);

// Read textArea contents
function getTextAreaContents() {
  const textAreaContents = document.querySelector('textarea').value;
  variableSeparator(textAreaContents);
}

function variableSeparator(varString) {
  const variables = varString.split('\n');
  const cleanedVariables = [];
  for (const v of variables) cleanedVariables.push(v.trim().toLowerCase());
  displayVariables(camelCaseConverter(cleanedVariables));
}

function camelCaseConverter(variables) {
  let camelArray = [];

  // Loop through each variable
  for (const v of variables) {
    let camelCaseVar = [];
    // Convert variable into array based on '_'
    // Use array destructuring and spread to allow for multi '_' in variables
    const [firstWord, ...remainingWords] = v.split('_');
    // First word doesn't need editing, so push it into camelCaseVar array now
    camelCaseVar.push(firstWord);
    // Loop through all remaining words in variable
    // Uppercase character of each word, then push to camelCaseVar
    for (const w of remainingWords) {
      camelCaseVar.push(w.replace(w[0], w[0].toUpperCase()));
    }
    // Combine camelCaseVar into string, then push to array of all converted vars
    camelArray.push(camelCaseVar.join(''));
  }

  return camelArray;
}

function displayVariables(variables) {
  let padLength = 20;
  for (const v of variables) {
    if (v.length > padLength) padLength = v.length + 5;
  }
  for (const [index, v] of variables.entries()) {
    console.log(`${v.padEnd(padLength)} ${`✅`.repeat(index + 1)}`);
  }
}
