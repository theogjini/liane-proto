import { Router } from "express";
import { travelService } from '../services';
import { catchAll } from '../utilities';
import { ObjectID } from "mongodb";


const getTravels = async (req, res) => {
    const cookie = req.cookies.sid;

    const response = await travelService.handleGetTravels(cookie);

    res.json(response);
};



const addTravel = async (req, res) => {
    const cookie = req.cookies.sid;
    const start = req.body.start;
    const end = req.body.end;
    const schedule = JSON.parse(req.body.schedule);

    const response = await travelService.handleAddTravel(cookie, start, end, schedule);

    res.json(response);
};



const findTravel = async (req, res) => {
    const start = req.body.start;
    const end = req.body.end;

    const response = await travelService.handleFindTravel(start, end);

    res.json(response);
};



const selectTravel = async (req, res) => {
    const travelId = req.body.travelId;
    const cookie = req.cookies.sid;

    const response = await travelService.handleSelectTravel(travelId, cookie);

    res.json(response);
};



const acceptRequest = async (req, res) => {
    const travelId = req.body.travelId;
    const travellerId = req.body.travellerId;

    const response = await travelService.handleAcceptRequest(travelId, travellerId);

    res.json(response);
};



const rejectRequest = async (req, res) => {
    const travelId = req.body.travelId;
    const travellerId = req.body.travellerId;

    const response = await travelService.handleRejectRequest(travelId, travellerId);

    res.json(response);
};



const travelController = new Router();

travelController.get('/get-travels', catchAll(getTravels));

travelController.post('/add-travel', catchAll(addTravel));

travelController.post('/find-travel', catchAll(findTravel));

travelController.post('/select-travel', catchAll(selectTravel));

travelController.post('/accept-request', catchAll(acceptRequest));

travelController.post('/reject-request', catchAll(rejectRequest));


export { travelController }