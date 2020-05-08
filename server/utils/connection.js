import { MongoClient } from "mongodb";

// Reuseable connection object that gets assinged on init
// on initMongo is called (preferably at application start)
// theh connection will be available whereever it's imported
let connection = null;

const initMongo = async (url) => {
  // if connection is null, assign it to a new mongo connection
  // else do nothing
  if (!connection) {
    console.log("Building new Mongo connection");
    try {
      const mongo = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      connection = mongo.db("liane");
      console.log("Connection Assigned!");

    } catch (e) {
      console.log(`Unable to connect to mongo: ${e}`)
      return null;
    }
  }

  return;
};

const getDb = (db) => {
  return connection.collection(db);
};

export { connection, initMongo, getDb };