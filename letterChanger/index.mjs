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

function setLetterChangerString(newString) {
    letterChanger.innerHTML = newString;
    setOutputInputString(newString);
}

/* Output Input Component */
function setOutputInputString(newString) {
    outputInput.value = newString
}

/* User Input Component */
userInput.addEventListener('input', () => setLetterChangerString(userInput.value))
