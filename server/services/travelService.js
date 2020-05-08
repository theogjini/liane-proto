import { authDatabase, travelDatabase } from '../databases'
import { ObjectID } from 'mongodb'

const handleGetTravels = async (cookie) => {
    const user = await authDatabase.getUserFromCookie(cookie);

    const travelIds = await user.travels.map(travelid => ObjectID(travelid));
    const travels = await travelDatabase.performGetTravels(travelIds)

    const response = { success: true, travels }

    return response;
};

export {
    handleGetTravels
};
