import capitalize from 'capitalize';

const week = [
    { cap: 'Monday', key: 'monday', short: 'Mon.' },
    { cap: 'Tuesday', key: 'tuesday', short: 'Tue.' },
    { cap: 'Wednesday', key: 'wednesday', short: 'Wed.' },
    { cap: 'Thursday', key: 'thursday', short: 'Thu.' },
    { cap: 'Friday', key: 'friday', short: 'Fri.' },
    { cap: 'Saturday', key: 'saturday', short: 'Sat.' },
    { cap: 'Sunday', key: 'sunday', short: 'Sun.' }
];


// canadian zip code formatting
const formatInput = (input) => {
    let capit = input.toUpperCase(input);
    let removeSpaces = "";
    for (let i = 0; i < input.length; i++) {
        let currentLetter = capit.charAt(i);
        removeSpaces = currentLetter !== " " && currentLetter !== "-" ? (removeSpaces + currentLetter) : (removeSpaces + "");
    };
    let insertDash = removeSpaces.length > 3 ? removeSpaces.slice(0, 3) + "-" + removeSpaces.slice(3, 6) : removeSpaces;
    console.log('insertDash:', insertDash)
    let finalOutput = insertDash.slice(0, 7)
    return finalOutput
};

const checkZipFormat = (input) => {
    const valueTable = [false, true, false, false, true, false, true]; // type A1A-1A1
    const inputToArray = input.split("");
    let verification = inputToArray.every((char, idx) => {
        let currentLetterIsNaN = parseInt(char) >= 0 && parseInt(char) <= 9;
        return currentLetterIsNaN === valueTable[idx];
    });
    return verification && input.length === valueTable.length;
};

export { week, formatInput, checkZipFormat };
