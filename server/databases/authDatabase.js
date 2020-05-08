import { connection } from '../utils/connection.js';
import uuidv1 from 'uuid/v1';

const getDb = (db) => {
    return connection.collection(db);
};


const performLogin = async (username, password) => {
    const usersDb = getDb("users");
    const user = await usersDb.findOne({ username });

    console.log('user', user)

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


const createNewSession = async (sessionId, userInfos) => {
    const sessionsDb = getDb("sessions")
    await sessionsDb.insertOne({ sid: sessionId, userInfos });
};

const performRestoreSession = async (cookie) => {
    const sessionsDb = getDb("sessions");
    const user = await sessionsDb.findOne({ sid: cookie });
    console.log('user restored:', user)
    return user;
};

export {
    performLogin,
    createNewSession,
    performRestoreSession
};