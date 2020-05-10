import { getDb } from '../utils/connection.js';
import { ObjectID } from 'mongodb';


const performGetChatrooms = async (travelIds) => {
    const chatroomsDb = getDb("chatrooms");

    const chatrooms = await chatroomsDb.find({ _travelId: { $in: travelIds } }).toArray();

    return chatrooms;
};



const performAddChatroom = async (newChatRoomId, newTravelId) => {
    const chatroomsDb = getDb("chatrooms");

    await chatroomsDb.insertOne({ _id: newChatRoomId, _travelId: newTravelId, messages: [] });
};



const performGetMessages = async (chatroomId) => {
    const chatroomsDb = getDb("chatrooms");

    const chatroom = await chatroomsDb.findOne({ _id: ObjectID(chatroomId) });

    const messages = await chatroom.messages;

    return messages;
};



const performSendMessage = async (newMessage, chatroomId) => {
    const chatroomsDb = getDb("chatrooms");

    console.log(newMessage, chatroomId);

    await chatroomsDb.updateOne({ _id: ObjectID(chatroomId) }, { $push: { messages: newMessage } });
};


export {
    performGetChatrooms,
    performAddChatroom,
    performGetMessages,
    performSendMessage
};

