import { authDatabase } from '../databases';
import sha1 from 'sha1';

const handleLogin = async (username, password) => {
    const { user, sessionId } = await authDatabase.performLogin(username, password);

    if (user.password != sha1(password)) {
        throw new Error('Invalid password!');
    };

    if (sessionId) {
        console.log('sessionId:', sessionId)
        await authDatabase.createNewSession(sessionId, user.infos)
    };

    // Here we should be saving sessions into a database, using the sessionID returned form performLogin
    return {
        client: {
            success: true,
            desc: 'Welcome back!',
            avatar: user.infos
        },
        sessionId
    }
}

const restoreSession = async (cookie) => {
    const user = await authDatabase.performRestoreSession(cookie)

    return {
        success: true,
        desc: 'Welcome back!',
        avatar: user.userInfos
    }

}

export {
    handleLogin,
    restoreSession
}