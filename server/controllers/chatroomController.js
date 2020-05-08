import { Router } from "express";
import { chatroomService } from '../services';
import { catchAll } from '../utilities';


const getChatrooms = async (req, res) => {
    const cookie = req.cookies.sid;

    const response = await chatroomService.handleGetChatrooms(cookie);

    res.json(response);
};


const chatroomController = new Router();

chatroomController.get('/get-chatrooms', catchAll(getChatrooms))

export { chatroomController }