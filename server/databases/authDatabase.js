import { getDb } from '../utils/connection.js';
import uuidv1 from 'uuid/v1';
import { User } from '../utilities';
import { ObjectID } from 'mongodb'


const performLogin = async (username, password) => {
    const usersDb = getDb("users");
    const user = await usersDb.findOne({ username });

    if (user === null) {
        throw new Error('Invalid username!');
    };

    const sessionId = uuidv1();

    return {
        user,
        sessionId
    };
};



const performSignup = async (username, password, user, id) => {
    const usersDb = getDb("users");
    const usernameAlreadyExist = await usersDb.findOne({ username });

    if (usernameAlreadyExist != null) {
        throw new Error('Username taken!');
    };

    const newUser = new User(username, password, user, id);

    const sessionId = uuidv1();

    return {
        userInfos: newUser.infos,
        sessionId
    };
};



const createNewSession = async (sessionId, userInfos) => {
    const sessionsDb = getDb("sessions")
    await sessionsDb.insertOne({ sid: sessionId, userInfos });
};



const performRestoreSession = async (cookie) => {
    const sessionsDb = getDb("sessions");
    const user = await sessionsDb.findOne({ sid: cookie });

    return user;
};



const performClearSession = async (cookie) => {
    const sessionsDb = getDb("sessions");
    await sessionsDb.deleteOne({ sid: cookie });
};



const performGetUserFromCookie = async (cookie) => {
    const sessionsDb = getDb("sessions");
    const session = await sessionsDb.findOne({ sid: cookie });

    const usersDb = getDb("users");
    const user = await usersDb.findOne({ _id: ObjectID(session.userInfos.registered) });

    return user;
};




const performUpdateUserTravels = async (travelId, userId) => {
    const usersDb = getDb("users");

    await usersDb.updateOne({ _id: ObjectID(userId) }, { $push: { travels: ObjectID(travelId) } });
};



const performGetUsers = async (idsToFind) => {
    const usersDb = getDb("users");

    const users = await usersDb.find({ _id: { $in: idsToFind } }).toArray();

    return users;
};



const performRejectUserRequest = async (travelId, travellerId) => {
    const usersDb = getDb("users");

    await usersDb.updateOne({ _id: ObjectID(travellerId) }, { $pull: { travels: ObjectID(travelId) } });
};



export {
    performLogin,
    performSignup,
    createNewSession,
    performRestoreSession,
    performClearSession,
    performGetUserFromCookie,
    performUpdateUserTravels,
    performGetUsers,
    performRejectUserRequest
};