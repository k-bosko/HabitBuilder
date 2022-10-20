import { Collection, ObjectId, MongoClient } from "mongodb";


async function getHabits() {
  let client;
    try {
      const url = "mongodb://0.0.0.0:27017/";
      //^^connect to protocol
      client = new MongoClient(url);

      await client.connect();

      console.log("Connected to Mongo Server");

      const db = client.db("HabitBuilder");

      const collection = db.collection("habits");


      const habits = await collection.find().toArray();

      return habits;

    } finally {
      await client.close();
    }
}

export default {
  getHabits,
}


