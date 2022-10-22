import { Collection, ObjectId, MongoClient } from "mongodb";


/* ------Katerina----- */
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

async function getHabit(habitId) {
  let client;
    try {
      const url = "mongodb://0.0.0.0:27017/";
      //^^connect to protocol
      client = new MongoClient(url);

      await client.connect();

      console.log("Connected to Mongo Server");

      const db = client.db("HabitBuilder");

      const collection = db.collection("habits");

      const habit = await collection.findOne({id: habitId});
      
      return habit;

    } finally {
      await client.close();
    }
}

async function deleteHabit(habitId) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("HabitBuilder");

    const collection = db.collection("habits");
    
    const result = await collection.deleteOne({ id: habitId});
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
    return result;

  } finally {
    await client.close();
  }
}


async function insertLogUnits(habitId, logUnits) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("HabitBuilder");

    const collection = db.collection("habits");

    console.log("got HabitId", habitId);
    console.log("got LogUnits", logUnits);
    
    const query = {
      id: habitId
      //TODO add date? 
    };
    // const tmp = await collection.findOne(query);
    // console.log("found", tmp);

    //TODO getLogUnits();
    //need to update the logUnits += getLogUnits();

    const update = {
      $set: {
        logUnits: logUnits,
      },
    };

    const result = await collection.updateOne(query, update);
    console.log(result);

    return result;

  } finally {
    await client.close();
  }
}

/* ------Katerina end----- */

export default {
  getHabits,
  getHabit,
  deleteHabit,
  insertLogUnits
}


