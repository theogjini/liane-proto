import { authDatabase } from '../databases';

const handleLogin = async (username, password) => {
    const { user, sessionId } = await authDatabase.performLogin(username, password);

    // Here we should be saving sessions into a database, using the sessionID returned form performLogin

    return user;
}

export {
    handleLogin,
}