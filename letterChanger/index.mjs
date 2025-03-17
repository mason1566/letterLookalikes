/* Element Declarations */
const content = document.getElementById("content");
const userInput = document.getElementById("userInput");
const letterChanger = document.getElementById("letterChanger");
const outputInput = document.getElementById("outputInput");

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
    letterChanger.innerHTML = "";
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

        // Create part of letterElement that will hold the letter selector
        let letterSelect = document.createElement("select");
        letterElement.appendChild(letterSelect);


        letterChanger.appendChild(letterElement);
    };
    setOutputInputString(newString);
}

/* Output Input Component */
function setOutputInputString(newString) {
    outputInput.value = newString
}

/* User Input Component */
userInput.addEventListener('input', () => setLetterChangerString(userInput.value))
