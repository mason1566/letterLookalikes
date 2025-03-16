let letterJson;
try {
    const response = await fetch('./letterLookalikes.json');
    letterJson= await response.json();
}
catch (err) {
    throw err;
}


let currentVariantIndex = 0;
let currentLetterIndex = 0;
let letters = Object.keys(letterJson); // An array of letters

// Make an object to hold the categorized letters
let newLetters = {};
letters.forEach(letter => {
    newLetters[letter] = {}
    newLetters[letter].lower = [];
    newLetters[letter].upper = [];
    newLetters[letter].other = [];
});
console.log(newLetters);

// HTML element references
const textOutput = document.getElementById("textOutput");
const lowerButton = document.getElementById("lowerButton");
const upperButton = document.getElementById("upperButton");
const otherButton = document.getElementById("otherButton");
const letterSelect = document.getElementById("letterSelect");
const renderJsonButton = document.getElementById("renderJsonButton");
const jsonOutput = document.getElementById("jsonOutput");

// Create option elements for each letter and append them to letterSelect element
letters.forEach((letter) => {
    const option = document.createElement("option");
    option.value = letter;
    option.innerHTML = letter;
    letterSelect.appendChild(option);
});

// Set the currentLetter to the selected option in the letterSelect element
currentLetterIndex = letters.indexOf(letterSelect.selectedOptions[0].value);
console.log(letters[currentLetterIndex]);
textOutput.value = letterJson[letters[currentLetterIndex]].lower[currentVariantIndex];

lowerButton.addEventListener('click', () => {
    let l = letters[currentLetterIndex];
    console.log(l)
    newLetters[l].lower.push(letterJson[l].lower[currentVariantIndex]);
    goNextVariant();
});

// Used to update the current letter (via the dropdown menu)
letterSelect.addEventListener('change', (event) => {
    currentLetterIndex = letters.indexOf(event.target.selectedOptions[0].value);
    textOutput.value = letters[currentLetterIndex];
});

// Used to output the newLetters json object
renderJsonButton.addEventListener('click', () => {
    jsonOutput.value = JSON.stringify(newLetters, null, 2);
});

function goNextVariant() {
    currentVariantIndex++;
    if (currentVariantIndex >= letterJson[currentLetter].lower.length) 
        goNextLetter();
    textOutput.value = letterJson[letters[currentLetterIndex]]
}

function goNextLetter() {
    currentLetterIndex++;
    currentVariantIndex = 0;
    if (currentLetterIndex >= letters.length) 
        endSurvey();

}

function endSurvey() {
    textOutput.value = "Done!";

    lowerButton.disabled = true;
    upperButton.disabled = true;
    otherButton.disabled = true;
}

console.log("Ready");