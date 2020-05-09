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
    console.log('addtravel called!!!', req.body)
    const cookie = req.cookies.sid;
    const start = req.body.start;
    const end = req.body.end;
    const schedule = JSON.parse(req.body.schedule);

    const response = await travelService.handleAddTravel(cookie, start, end, schedule);

    res.json(response);
};


const travelController = new Router();

travelController.get('/get-travels', catchAll(getTravels))

travelController.post('/add-travel', catchAll(addTravel))

export { travelController }