import { authDatabase, chatroomDatabase } from '../databases'
import { ObjectID } from 'mongodb'

const handleGetChatrooms = async (cookie) => {
    const user = await authDatabase.getUserFromCookie(cookie);

    if (!user.infos.registered) {
        throw new Error('User not registered!')
    };

    console.log('handlegetChatrooms', user)

    const travelIds = await user.travels.map(travelId => ObjectID(travelId));
    const chatrooms = await chatroomDatabase.performGetChatrooms(travelIds)

    const response = { success: true, chatrooms }

    return response;
};

export {
    handleGetChatrooms
};
