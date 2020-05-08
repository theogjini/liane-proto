import { Router } from "express";
import { travelService } from '../services';
import { catchAll } from '../utilities';
import { ObjectID } from "mongodb";


const getTravels = async (req, res) => {
    const cookie = req.cookies.sid;

    const response = await travelService.handleGetTravels(cookie);

    res.json(response);
};


const travelController = new Router();

travelController.get('/get-travels', catchAll(getTravels))

export { travelController }