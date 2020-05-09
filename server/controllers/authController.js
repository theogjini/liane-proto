import { Router } from "express";
import { authService } from '../services';
import { catchAll } from '../utilities';
import { ObjectID } from "mongodb";

const login = async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password) {
        throw new TypeError('Missing params!');
    };

    const username = req.body.username;
    const password = req.body.password;
    const cookie = req.cookies.sid;

    const response = await authService.handleLogin(username, password, cookie);

    res.cookie('sid', response.sessionId);
    res.json(response.client);
};



const signup = async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password) {
        throw new TypeError('Missing params!');
    };

    const username = req.body.username;
    const passwordUnhashed = req.body.password;
    const id = new ObjectID;
    const user = JSON.parse(req.body.avatar);

    const response = await authService.handleSignup(username, passwordUnhashed, user, id);

    res.cookie('sid', response.sessionId);
    res.json(response.client);
};



const restoreSession = async (req, res) => {
    const cookie = req.cookies.sid;

    const response = await authService.restoreSession(cookie);

    res.json(response);
};



const clearSession = async (req, res) => {
    const cookie = req.cookies.sid;

    const response = await authService.clearSession(cookie);

    res.json(response);
};


const getUsersFromRequests = async (req, res) => {
    const idsSent = JSON.parse(req.body.requestsId);

    const idsToFind = idsSent.map(id => ObjectID(id));
    const response = await authService.handleGetUsers(idsToFind);

    res.json(response);
};

// instantiate new router
const authController = new Router();

// bind routes to functions
authController.post('/login', catchAll(login));

authController.get('/session', catchAll(restoreSession));

authController.post('/signup', catchAll(signup));

authController.get('/logout', catchAll(clearSession));

authController.post('/get-users-from-requests', catchAll(getUsersFromRequests))


export {
    authController
};