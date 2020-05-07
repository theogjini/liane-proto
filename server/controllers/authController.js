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

    res.json(response);
}

const signup = async (req, res) => {
    res.json({ success: 'working' });
};

// instantiate new router
const authController = new Router();

// bind routes to functions
authController.post('/login', catchAll(login));

authController.get('/signup', catchAll(signup));
// authController.get('/session', catchAll(session));


export {
    authController
};