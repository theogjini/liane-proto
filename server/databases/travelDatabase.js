import { connection, getDb } from '../utils/connection.js';


const performGetTravels = async (travelIds) => {
    const travelsDb = getDb("travels");

    const travels = await travelsDb.find({ _id: { $in: travelIds } }).toArray();

    return travels;
};


export {
    performGetTravels
}

