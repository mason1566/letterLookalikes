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
// console.log(newLetters);

// HTML element references
const textOutput = document.getElementById("textOutput");
const lowerButton = document.getElementById("lowerButton");
const upperButton = document.getElementById("upperButton");
const otherButton = document.getElementById("otherButton");
const deleteButton = document.getElementById("deleteButton");
const letterSelect = document.getElementById("letterSelect");
const renderJsonButton = document.getElementById("renderJsonButton");
const jsonOutput = document.getElementById("jsonOutput");
const liveUpdateCheckbox = document.getElementById("liveUpdateCheckbox");

// Reset jsonOutput values based on previous states (browser caches these elements)
if (liveUpdateCheckbox.checked)
    jsonOutput.value = JSON.stringify(newLetters, null, 2);
else
    jsonOutput.value = "";

// Create option elements for each letter and append them to letterSelect element
letters.forEach((letter) => {
    const option = document.createElement("option");
    option.value = letter;
    option.innerHTML = letter;
    letterSelect.appendChild(option);
});

// Set the currentLetter to the selected option in the letterSelect element
currentLetterIndex = letters.indexOf(letterSelect.selectedOptions[0].value);
// console.log(letters[currentLetterIndex]);
textOutput.value = letterJson[letters[currentLetterIndex]].lower[currentVariantIndex];

lowerButton.addEventListener('click', () => {
    let l = letters[currentLetterIndex];
    newLetters[l].lower.push(letterJson[l].lower[currentVariantIndex]);
    goNextVariant();
});

upperButton.addEventListener('click', () => {
    let l = letters[currentLetterIndex];
    newLetters[l].upper.push(letterJson[l].lower[currentVariantIndex]);
    goNextVariant();
});

otherButton.addEventListener('click', () => {
    let l = letters[currentLetterIndex];
    newLetters[l].other.push(letterJson[l].lower[currentVariantIndex]);
    goNextVariant();
});

deleteButton.addEventListener('click', () => {
    goNextVariant();
})

// Used to update the current letter (via the dropdown menu)
letterSelect.addEventListener('change', (event) => {
    currentLetterIndex = letters.indexOf(event.target.selectedOptions[0].value);
    goToLetter(letters[currentLetterIndex])
});

// Used to output the newLetters json object
renderJsonButton.addEventListener('click', () => {
    jsonOutput.value = JSON.stringify(newLetters, null, 2);
});

if (window.localStorage.textareaHeight && window.localStorage.textareaWidth) {
    jsonOutput.style.height = `${window.localStorage.textareaHeight}px`;
    jsonOutput.style.width = `${window.localStorage.textareaWidth}px`;
}

// Observe resizing of the textarea
const textareaResizeObserver = new ResizeObserver((entry) => {
    window.localStorage.textareaHeight = entry[0].contentRect.height;
    window.localStorage.textareaWidth = entry[0].contentRect.width;
})
textareaResizeObserver.observe(jsonOutput);

// Activate live updating of json output if checkbox is checked
let liveUpdateActive = liveUpdateCheckbox.checked;
liveUpdateCheckbox.addEventListener('change', () => {
    liveUpdateActive = liveUpdateCheckbox.checked;
    if (liveUpdateActive) 
        jsonOutput.value = JSON.stringify(newLetters, null, 2);
});

function deleteCurrentVariant() {
    letterJson[letters[currentLetterIndex]].lower.splice(currentVariantIndex, 1);
}

function goNextVariant() {
    // currentVariantIndex++;
    deleteCurrentVariant();
    if (currentVariantIndex >= letterJson[letters[currentLetterIndex]].lower.length) {
        disableLetterButtons()
        disableLetterOption(currentLetterIndex);
        textOutput.value = "Done!";
    }
    else {
        textOutput.value = letterJson[letters[currentLetterIndex]].lower[currentVariantIndex];
    
        if (liveUpdateActive) {
            jsonOutput.value = JSON.stringify(newLetters, null, 2);
        }
    }
}

function goToLetter(letter) {
    // Enable/disable buttons if there are no entries to give
    let letterIndex = letters.indexOf(letter);
    if (letterIndex == -1) 
        throw new Error("Letter index out of range.");
    currentLetterIndex = letterIndex;
    currentVariantIndex = 0;

    if (letterJson[letters[currentLetterIndex]].lower.length <= 0) {
        textOutput.value = "Done!";
        disableLetterButtons();
        disableLetterOption(currentLetterIndex);
    }
    else {
        textOutput.value = letterJson[letters[currentLetterIndex]].lower[currentVariantIndex];
        enableLetterButtons();
    }
}

function disableLetterButtons() {
    lowerButton.disabled = true;
    upperButton.disabled = true;
    otherButton.disabled = true;
}

function enableLetterButtons() {
    lowerButton.disabled = false;
    upperButton.disabled = false;
    otherButton.disabled = false;
}

function disableLetterOption(index) {
    letterSelect.children[index].disabled = true;
}

function endSurvey() {

}