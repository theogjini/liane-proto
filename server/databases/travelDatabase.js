import { getDb } from '../utils/connection.js';
import { ObjectID } from 'mongodb';


const performGetTravels = async (travelIds) => {
    const travelsDb = getDb("travels");

    const travels = await travelsDb.find({ _id: { $in: travelIds } }).toArray();

    return travels;
};



const performAddTravel = async (travelToAdd) => {
    const travelsDb = getDb("travels");

    await travelsDb.insertOne(travelToAdd)
};



const performMatchingTravels = async (start, end) => {
    const travelsDb = getDb("travels");

    const travels = await travelsDb.find().toArray();

    const results = await travels.filter(travel => {
        return travel.start === start && travel.end === end
    });

    return results;
};



const performGetTravelFromId = async (travelId) => {
    const travelsDb = getDb("travels");

    const travel = await travelsDb.findOne({ _id: ObjectID(travelId) });

    return travel;
};



const performSelectTravel = async (travelId, userId) => {
    const travelsDb = getDb("travels");

    await travelsDb.updateOne({ _id: ObjectID(travelId) }, { $push: { requests: ObjectID(userId) } });

    return { success: true, desc: 'Request sent!' };
};



const performAcceptRequest = async (travelId, travellerId) => {
    const travelsDb = getDb("travels");

    const travel = await travelsDb.findOne({ _id: ObjectID(travelId) })

    console.log('travel:', travel);

    await travelsDb.updateOne({ _id: ObjectID(travelId) }, { $pull: { requests: ObjectID(travellerId) }, $push: { attendees: ObjectID(travellerId) } });


    const travelafter = await travelsDb.findOne({ _id: ObjectID(travelId) })

    console.log('travelafter:', travelafter);
};



const performRejectRequest = async (travelId, travellerId) => {
    const travelsDb = getDb("travels");

    await travelsDb.updateOne({ _id: ObjectID(travelId) }, { $pull: { requests: ObjectID(travellerId) } });
};



export {
    performGetTravels,
    performAddTravel,
    performMatchingTravels,
    performSelectTravel,
    performGetTravelFromId,
    performAcceptRequest,
    performRejectRequest
}

