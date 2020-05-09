import { connection, getDb } from '../utils/connection.js';


const performGetChatrooms = async (travelIds) => {
    const chatroomsDb = getDb("chatrooms");

    const chatrooms = await chatroomsDb.find({ _travelId: { $in: travelIds } }).toArray();

    return chatrooms;
};


const performAddChatroom = async (newChatRoomId, newTravelId) => {
    const chatroomsDb = getDb("chatrooms");

    await chatroomsDb.insertOne({ _id: newChatRoomId, _travelId: newTravelId, messages: [] });
};


export {
    performGetChatrooms,
    performAddChatroom
};

