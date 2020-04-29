import { connection } from '../utils/connection.js';

const performLogin = async (username, password) => {
    const user = await connection.collection("users").findOne({ username });

    if (user === null) {
        throw new Error("Invalid username");
    };

    if (user.password != sha1(password)) {
        throw new Error("Invalid password");
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