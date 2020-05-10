import { Router } from "express";
import { chatroomService } from '../services';
import { catchAll } from '../utilities';


const getChatrooms = async (req, res) => {
    const cookie = req.cookies.sid;

    const response = await chatroomService.handleGetChatrooms(cookie);

    res.json(response);
};



const getMessages = async (req, res) => {
    console.log('get-messages called');
    const chatroomId = req.body.chatroomId

    const response = await chatroomService.handleGetMessages(chatroomId);

    res.json(response);
};



const sendMessage = async (req, res) => {
    console.log('send-messages called');
    const chatroomId = req.body.chatroomId;
    const cookie = req.cookies.sid;
    const content = req.body.content;
    const timestamp = req.body.timestamp;

    const response = await chatroomService.handleSendMessage(chatroomId, cookie, content, timestamp);

    res.json(response);
};



const chatroomController = new Router();

chatroomController.get('/get-chatrooms', catchAll(getChatrooms));

chatroomController.post('/get-messages', catchAll(getMessages));

chatroomController.post('/send-message', catchAll(sendMessage));


export { chatroomController }