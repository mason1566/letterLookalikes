/* Element Declarations */
const content = document.getElementById("content");
const userInput = document.getElementById("userInput");
const letterChanger = document.getElementById("letterChanger");
const outputInput = document.getElementById("outputInput");
const notepadTextarea = document.getElementById("notepadTextarea");

/* Letter JSON Fetch */
let letterJson;
try {
    const response = await fetch('./letterLookalikes.json');
    letterJson=await response.json();
}
catch (err) {
    throw err;
}

// Mutate the data to separate the lower and upperacase variants of the letters
let casedLetterJson = {};
for (let letter of Object.keys(letterJson)) {
    casedLetterJson[letter] = letterJson[letter].lower;
    casedLetterJson[letter.toUpperCase()] = [...letterJson[letter].upper, ...letterJson[letter].other]; // add others to the uppercase variant
}

/* Content Component */
content.style.display = "flex";
content.style.width = "100%";
content.style.alignItems = "flex-start";

/* Letter Changer Component */
letterChanger.style.overflow = "scroll";
letterChanger.style.width = "100%";
letterChanger.style.paddingBottom = "10px";
letterChanger.style.display = "flex";
letterChanger.style.flexDirection = "row";

function setLetterChangerString(newString) {
    letterChanger.innerHTML = ""; // Clear current text
    for (let letter of newString) { 
        // Create the letter element and set its properties
        let letterElement = document.createElement("span");
        letterElement.style.display = "flex";
        letterElement.style.flexDirection = "column";
        letterElement.style.alignItems = "center";

        // Create part of letterElement that will hold the text
        let letterText = document.createElement("span");
        letterText.innerText = letter;
        letterElement.appendChild(letterText);

        if (!casedLetterJson[letter])
            continue;

        // Create part of letterElement that will hold the letter selector
        let letterSelect = document.createElement("select");
        letterElement.appendChild(letterSelect);

        letterSelect.addEventListener('change', (event) => {
            letterText.innerText = event.target.selectedOptions[0].value;
                let outputString = "";
                for (let letterEl of letterChanger.children) {
                    outputString += letterEl.children[0].innerText;
                }
                setOutputInputString(outputString);
        })

        // populate select element with options
        if (casedLetterJson[letter]) {
            for (let variant of casedLetterJson[letter]) {
                // Create a new option
                let varOption = document.createElement("option");
                varOption.value = variant;
                varOption.innerText = variant;
                letterSelect.appendChild(varOption);
            }
        }
                
        letterChanger.appendChild(letterElement);
    };
    let outputString = "";
    for (let letterEl of letterChanger.children) {
        outputString += letterEl.children[0].innerText;
    }
    setOutputInputString(outputString);
}

/* Output Input Component */
function setOutputInputString(newString) {
    outputInput.value = newString
}

/* User Input Component */
userInput.addEventListener('input', () => setLetterChangerString(userInput.value))

/* Notepad Textarea Component */
// If the width and height of the textare are set in local storage, assign them to the notepad textarea
if (window.localStorage.textareaHeight && window.localStorage.textareaWidth) {
    notepadTextarea.style.height = `${window.localStorage.textareaHeight}px`;
    notepadTextarea.style.width = `${window.localStorage.textareaWidth}px`;
}
// Create a trigger that records resizing of the notepad area for use on refresh
const textareaResizeObserver = new ResizeObserver((entry) => {
    window.localStorage.textareaHeight = entry[0].contentRect.height;
    window.localStorage.textareaWidth = entry[0].contentRect.width;
})
textareaResizeObserver.observe(notepadTextarea); // Observe resizing of the textarea