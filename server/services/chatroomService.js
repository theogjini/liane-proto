import { authDatabase, chatroomDatabase } from '../databases';
import { ObjectID } from 'mongodb';
import { Message } from '../utilities';


const handleGetChatrooms = async (cookie) => {
    const user = await authDatabase.performGetUserFromCookie(cookie);

    if (!user.infos.registered) {
        throw new Error('User not registered!')
    };

    const travelIds = await user.travels.map(travelId => ObjectID(travelId));
    const chatrooms = await chatroomDatabase.performGetChatrooms(travelIds)

    const response = { success: true, chatrooms }

    return response;
};



const handleGetMessages = async (chatroomId) => {
    const messages = await chatroomDatabase.performGetMessages(chatroomId);

    const response = { success: true, desc: 'Chatroom found!', messages }

    return response;
};



const handleSendMessage = async (chatroomId, cookie, content, timestamp) => {
    const user = await authDatabase.performGetUserFromCookie(cookie);

    const newMessage = await new Message(user.infos, content, timestamp);

    await chatroomDatabase.performSendMessage(newMessage, chatroomId);

    const response = { success: true, desc: '!message sent' };

    return response;
};


export {
    handleGetChatrooms,
    handleGetMessages,
    handleSendMessage
};
