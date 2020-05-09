import { authDatabase, travelDatabase, chatroomDatabase } from '../databases'
import { ObjectID } from 'mongodb'

const handleGetTravels = async (cookie) => {
    const user = await authDatabase.getUserFromCookie(cookie);

    const travelIds = await user.travels.map(travelid => ObjectID(travelid));
    const travels = await travelDatabase.performGetTravels(travelIds)

    const response = { success: true, travels }

    return response;
};


const handleAddTravel = async (cookie, start, end, schedule) => {
    const user = await authDatabase.getUserFromCookie(cookie);

    await schedule.forEach(async (dayTravel, idx) => {
        if (dayTravel != null) {
            const newTravelId = new ObjectID();
            const newChatRoomId = new ObjectID();
            const day = dayTravel.goDate ? new Date(dayTravel.goDate).getDay() : idx;
            const driverId = user._id;
            const travelToAdd = {
                _id: newTravelId,
                _chatroomId: newChatRoomId,
                start,
                end,
                day,
                driver: driverId,
                seatsAvailable: dayTravel.seatsAvailable,
                attendees: [],
                requests: [],
                goTime: dayTravel.goTime,
                returnTime: dayTravel.returnTime,
                goDate: dayTravel.goDate ? dayTravel.goDate : null
            };
            console.log('travelToAdd: ', travelToAdd);
            await travelDatabase.performAddTravel(travelToAdd);
            await chatroomDatabase.performAddChatroom(newChatRoomId, newTravelId);
            await authDatabase.performUpdateUserTravels(driverId, newTravelId);
        }
    })

    const response = { success: true }

    return response;
};


const handleFindTravel = async (start, end) => {
    const results = await travelDatabase.performMatchingTravels(start, end);

    console.log('travels found', results);

    if (results.length === 0) {
        throw Error('No travels found...')
    };

    const response = { success: true, results };

    return response;
};


const handleSelectTravel = async (travelId, cookie) => {
    const user = await authDatabase.getUserFromCookie(cookie);
    const userId = user._id;

    const travel = await travelDatabase.getTravelFromId(travelId);

    const isUserAlreadyIn = await travel.attendees.some(id => ObjectID(id).toString() === ObjectID(userId).toString())
    const isRequestAlreadySent = await travel.requests.some(id => ObjectID(id).toString() === ObjectID(userId).toString());

    if (isUserAlreadyIn) {
        const response = { success: false, desc: 'You are already in ;)' };
        return response;
    };

    if (isRequestAlreadySent) {
        const response = { success: false, desc: 'Request already sent!' };
        return response;
    };

    const response = await travelDatabase.performSelectTravel(travelId, userId);
    await authDatabase.performSelectTravel(travelId, userId);

    return response;
};

export {
    handleGetTravels,
    handleAddTravel,
    handleFindTravel,
    handleSelectTravel
};
