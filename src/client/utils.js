import { monkeys, avatarsPaths } from './monkeys.js';
import capitalize from 'capitalize';
import { uniqueNamesGenerator, adjectives, colors } from 'unique-names-generator';

const week = [
    { cap: 'Monday', key: 'monday', short: 'Mon.' },
    { cap: 'Tuesday', key: 'tuesday', short: 'Tue.' },
    { cap: 'Wednesday', key: 'wednesday', short: 'Wed.' },
    { cap: 'Thursday', key: 'thursday', short: 'Thu.' },
    { cap: 'Friday', key: 'friday', short: 'Fri.' },
    { cap: 'Saturday', key: 'saturday', short: 'Sat.' },
    { cap: 'Sunday', key: 'sunday', short: 'Sun.' }
];

class DayTravel {
    constructor(goTime, returnTime, goDate) {
        this.goTime = goTime;
        this.returnTime = returnTime;
        this.goDate = goDate;
        this.seatsAvailable = 0;
        this.attendees = [];
    };
    isSelected() {
        return this.goTime || this.returnTime
    };
};

// Create unique avatar

const popUniqueAvatar = () => {
    const uniqueMonkeyName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, monkeys.names] });
    const formattedName = capitalize.words(uniqueMonkeyName.split("_").join(" "));
    let uniqueMonkey = {
        name: formattedName,
        original: uniqueMonkeyName,
        path: avatarsPaths[Math.floor(Math.random() * avatarsPaths.length)]
    };
    return uniqueMonkey;
}

// Canadian zip code formatting
const formatInput = (input) => {
    let capit = input.toUpperCase(input);
    let removeSpaces = "";
    for (let i = 0; i < input.length; i++) {
        let currentLetter = capit.charAt(i);
        removeSpaces = currentLetter !== " " && currentLetter !== "-" ? (removeSpaces + currentLetter) : (removeSpaces + "");
    };
    let insertDash = removeSpaces.length > 3 ? removeSpaces.slice(0, 3) + "-" + removeSpaces.slice(3, 6) : removeSpaces;
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

// Notification engine
let timer;
const notification = (category, message, dispatch) => {
    clearTimeout(timer);
    dispatch({ type: "NOTIFY", category: category, message: message });
    const stopNotify = () => {
        dispatch({ type: "STOP_NOTIFY", message: '' });
    };
    timer = setTimeout(stopNotify, 2500);
};

// Get user travels
async function getUserTravels(dispatch) {
    const req = await fetch('/travel/get-travels');
    const parsed = await req.json();
    if (parsed.success) {
        console.log('parsed travels:', parsed.travels)
        dispatch({ type: 'GET_TRAVELS', travels: parsed.travels });
    };
    if (!parsed.success) {
        console.log('parsed travels:', parsed.desc)
    };
};

async function getUserChatrooms(dispatch) {
    const req = await fetch('/get-chatrooms');
    const parsed = await req.json();
    if (parsed.success) {
        let currentChatrooms = parsed.chatrooms;
        let chatroomsObj = currentChatrooms.reduce((acc, chatroom) => {
            acc[chatroom._id] = chatroom.messages
            return acc;
        }, {});
        console.log('parsed chatrooms:', chatroomsObj)
        dispatch({ type: 'GET_CHATROOMS', chatrooms: chatroomsObj });
    };
    if (!parsed.success) {
        console.log('parsed chatrooms:', parsed.desc)
    };
};

export {
    week,
    formatInput,
    checkZipFormat,
    notification,
    DayTravel,
    getUserChatrooms,
    getUserTravels,
    popUniqueAvatar
};
