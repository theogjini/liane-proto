import { connection } from '../utils/connection.js';

const getDb = () => {
    return connection.collection("users");
}

const performLogin = async (username, password) => {
    const db = getDb();
    const user = await db.findOne({ username });

    console.log('user', user)

    if (user === null) {
        throw new Error("No user found!");
    };

    // if we pass the above conditional, userpass must match the sha1
    console.log("Login Success");
    const sessionId = uuidv1();

    return {
        user,
        sessionId
    };
}

export {
    performLogin
}