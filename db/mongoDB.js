import { MongoClient, ObjectId } from "mongodb";

function MongoHabitsModule() {
    const db = {};
    const url = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/";
    const DB_NAME = "HabitBuilder";
    const COLLECTION_NAME = "habits";

    /* ------Katerina----- */
    async function getHabits() {
        let client;

        try {
            client = new MongoClient(url);
            await client.connect();
            console.log("Connected to Mongo Server");

            const mongo = client.db(DB_NAME);
            const habitsCollection = mongo.collection(COLLECTION_NAME);

            const habits = await habitsCollection.find().toArray();
            return habits;
        } finally {
            await client.close();
        }
    }

    async function deleteHabit(habitId) {
        let client;

        try {
            client = new MongoClient(url);
            await client.connect();
            console.log("Connected to Mongo Server");

            const mongo = client.db(DB_NAME);
            const habitsCollection = mongo.collection(COLLECTION_NAME);

            const result = await habitsCollection.deleteOne({
                _id: ObjectId(habitId),
            });
            if (result.deletedCount === 1) {
                console.log("Successfully deleted one document.");
            } else {
                console.log(
                    "No documents matched the query. Deleted 0 documents."
                );
            }
            return result;
        } finally {
            await client.close();
        }
    }

    async function insertLogUnits(habitId, logUnits) {
        console.log("got HabitId", habitId);
        console.log("got LogUnits", logUnits);
        let client;

        try {
            client = new MongoClient(url);
            await client.connect();
            console.log("Connected to Mongo Server");

            const mongo = client.db(DB_NAME);
            const habitsCollection = mongo.collection(COLLECTION_NAME);

            const query = {
                _id: ObjectId(habitId),
                //TODO add date?
            };

            //NOTE: new logUnits are added to array
            const append = {
                $push: {
                    logUnits: logUnits,
                },
            };

            const result = await habitsCollection.updateOne(query, append);
            console.log(result);

            return result;
        } finally {
            await client.close();
        }
    }

    db.getHabits = getHabits;
    db.deleteHabit = deleteHabit;
    db.insertLogUnits = insertLogUnits;

    /* ------Katerina end----- */

    /* ------Anshul Start----- */
    async function createHabits(
        habitName,
        goalPerDay,
        startDate,
        numberOfDays,
        picture
    ) {
        let client;

        try {
            client = new MongoClient(url);
            await client.connect();
            console.log("Connected to Mongo Server");

            const mongo = client.db(DB_NAME);
            const habitsCollection = mongo.collection(COLLECTION_NAME);

            let query = {
                habit: habitName,
                startDate: startDate,
                goalPerDay: goalPerDay,
                numberOfDays: numberOfDays,
                picture: picture,
                status: "incomplete",
            };

            console.log(query);

            const result = await habitsCollection.insertOne(query);
            console.log(result);

            return result;
        } finally {
            await client.close();
        }
    }
    db.createHabits = createHabits;

    async function getHabitsWithAwards() {
        // user id
        let client;

        try {
            client = new MongoClient(url);
            await client.connect();
            console.log("Connected to Mongo Server");

            const mongo = client.db(DB_NAME);
            const habitsCollection = mongo.collection(COLLECTION_NAME);

            let query = {
                status: "completed",
            };

            console.log(query);

            const result = await habitsCollection.find(query).toArray();
            console.log(result);

            return result;
        } finally {
            await client.close();
        }
    }
    db.getHabitsWithAwards = getHabitsWithAwards;
    /* ------Anshul End----- */

    return db;
}

export default MongoHabitsModule();
