import { connection, getDb } from '../utils/connection.js';


const performGetChatrooms = async (travelIds) => {
    const chatroomsDb = getDb("chatrooms");

    const chatrooms = await chatroomsDb.find({ _travelId: { $in: travelIds } }).toArray();

    console.log('chatroomsrecovered', chatrooms);

    return chatrooms;
};


export {
    performGetChatrooms
}

