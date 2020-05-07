import { authDatabase } from '../databases';
import sha1 from 'sha1'; 1

const handleLogin = async (username, password) => {
    const { user, sessionId } = await authDatabase.performLogin(username, password);

    if (user.password != sha1(password)) {
        throw new Error('Invalid password!');
    };

    // Here we should be saving sessions into a database, using the sessionID returned form performLogin
    return {
        success: true,
        desc: 'Welcome back!',
        avatar: user.infos,
    }
}

export {
    handleLogin,
}