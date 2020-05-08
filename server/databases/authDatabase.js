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

    // if we pass the above conditional, userpass must match the sha1
    console.log("Login Success");
    const sessionId = uuidv1();

    return {
        user,
        sessionId
    };
};



const performSignup = async (username, password, user, id) => {
    const users = getDb("users");
    const usernameAlreadyExist = await users.findOne({ username });

    if (usernameAlreadyExist != null) {
        throw new Error('Username taken!');
    };

    const newUser = new User(username, password, user, id);
    console.log('new user is this one: ', newUser);
    // await users.insertOne(newUser);

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


const getUserFromCookie = async (cookie) => {
    const sessionsDb = getDb("sessions");
    const session = await sessionsDb.findOne({ sid: cookie });

    const userDb = getDb("users");
    const user = await userDb.findOne({ _id: ObjectID(session.userInfos.registered) });

    return user;
};


export {
    performLogin,
    performSignup,
    createNewSession,
    performRestoreSession,
    performClearSession,
    getUserFromCookie
};