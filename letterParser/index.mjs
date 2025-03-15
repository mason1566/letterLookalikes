import { readFileSync, writeFileSync } from "fs";
import letterJson from "../letterLookalikes.json" assert {type: "json"};

// This is the directory that holds the files containing the letter variations
const lettersDir = "../letters/";

let letters = Object.keys(letterJson);

function parseLetters(letter) {
    const file = `${lettersDir}${letter}`;

    let data;
    try {
        data = readFileSync(file);
    } catch (err) {
        throw err;
    }
    
    // Take the first character from the letter representation and add it to the letter array (if it isn't already present).
    let letterData = data.toString().split("\n");
    letterData.forEach((letterVariation) => {
        let newLetter = letterVariation.charAt(0);
        if (!letterJson[letter].lower.includes(newLetter))
            letterJson[letter].lower.push(newLetter);
    })
    
}

for (const letter of letters) {
    try {
        parseLetters(letter);
    } catch (err) {
        console.log(`${letter} error`);
    }
}

console.log(letterJson);

// write letters to a file
const outFile = "./letterLookalikes.json";

writeFileSync(outFile, JSON.stringify(letterJson, null, 2));