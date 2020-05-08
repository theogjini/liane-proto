import { Router } from "express";
import { authService } from '../services';
import { catchAll } from '../utilities';

const login = async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password) {
        throw new TypeError('Missing params!')
    }

    const username = req.body.username;
    const password = req.body.password;

    const response = await authService.handleLogin(username, password);

    res.cookie('sid', response.sessionId);
    res.json(response.client);
}

const signup = async (req, res) => {
    res.json({ success: 'working' });
};

const restoreSession = async (req, res) => {
    const cookie = req.cookies.sid;
    console.log('restoreSession:', cookie);

    const response = await authService.restoreSession(cookie);

    res.json(response);
};

// instantiate new router
const authController = new Router();

// bind routes to functions
authController.post('/login', catchAll(login));

authController.get('/session', catchAll(restoreSession));

authController.get('/signup', catchAll(signup));


export {
    authController
};