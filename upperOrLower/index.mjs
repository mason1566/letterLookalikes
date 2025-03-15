// import letterJson from "";
// console.log(letterJson);
// letterJson = JSON.parse(letterJson);
// console.log(letterJson);
// let letters = Object.entries(letterJson).map(letterObject => letterObject);

let letterJson;
let letters;
try {
    const response = await fetch('./letterLookalikes.json');
    letterJson= await response.json();
}
catch (err) {
    throw err;
}

let currentIndex = 0;
let currentLetter;


console.log(letterJson);

const textOutput = document.getElementById("textOutput");
const lowerButton = document.getElementById("lowerButton");
const upperButton = document.getElementById("upperButton");
const otherButton = document.getElementById("otherButton");
const letterSelect = document.getElementById("letterSelect");

Object.keys(letterJson).forEach((letter) => {
    const option = document.createElement("option");
    option.value = letter;
    option.innerHTML = letter;
    letterSelect.appendChild(option);
});

// Set the currentLetter to the selected option in the letterSelect element
currentLetter = letterSelect.selectedOptions[0].value;
console.log(currentLetter)
textOutput.value = letterJson[currentLetter].lower[currentIndex];
lowerButton.addEventListener('onclick', () => {
    
});

// Used to update the current letter (via the dropdown menu)
letterSelect.addEventListener('change', (event) => {
    currentLetter = event.target.selectedOptions[0].value;
    textOutput.value = currentLetter;
});
