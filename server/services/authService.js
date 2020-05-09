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

    return {
        client: {
            success: true,
            desc: 'Welcome back!',
            avatar: user.infos
        },
        sessionId
    }
};



const handleSignup = async (username, passwordUnhashed, user, id) => {
    const password = sha1(passwordUnhashed);
    const { userInfos, sessionId } = await authDatabase.performSignup(username, password, user, id);

    if (sessionId) {
        console.log('sessionId:', sessionId)
        await authDatabase.createNewSession(sessionId, userInfos)
    };

    return {
        client: {
            success: true,
            desc: 'Thrilled to have you here!',
            avatar: userInfos
        },
        sessionId
    }
};



const restoreSession = async (cookie) => {
    const user = await authDatabase.performRestoreSession(cookie);

    if (user === null && cookie) {
        throw new ReferenceError('This session cookie no longer available')
    };

    return {
        success: true,
        desc: 'Welcome back!',
        avatar: user.userInfos
    }
};



const clearSession = async (cookie) => {
    await authDatabase.performClearSession(cookie);

    return {
        success: true,
        desc: 'See you soon'
    };
};



const handleGetUsers = async (idsToFind) => {
    const users = await authDatabase.performGetUsers(idsToFind);

    const infosToSend = await users.map(user => user.infos);

    const response = { success: true, desc: "Infos well sent", usersRequests: infosToSend }
    console.log('arrayOfUsers', infosToSend);
    return response;

};



export {
    handleLogin,
    handleSignup,
    restoreSession,
    clearSession,
    handleGetUsers
}