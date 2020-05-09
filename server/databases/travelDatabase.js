import { getDb } from '../utils/connection.js';

const performGetTravels = async (travelIds) => {
    const travelsDb = getDb("travels");

    const travels = await travelsDb.find({ _id: { $in: travelIds } }).toArray();

    return travels;
};

const performAddTravel = async (travelToAdd) => {
    const travelsDb = getDb("travels");

    await travelsDb.insertOne(travelToAdd)
};


export {
    performGetTravels,
    performAddTravel
}

