import { authDatabase } from '../databases';

const handleLogin = async (username, password) => {
    const { user, sessionId } = await authDatabase.performLogin(username, password);

    if (user.password != sha1(password)) {
        throw new Error("Invalid password");
    };

    // Here we should be saving sessions into a database, using the sessionID returned form performLogin

    return user.info
}

export {
    handleLogin,
}