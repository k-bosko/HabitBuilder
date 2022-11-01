import { MongoClient, ObjectId } from "mongodb";

function MongoHabitsModule() {
    const db = {};
    const url = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/";
    const DB_NAME = "HabitBuilder";
    const COLLECTION_HABITS = "habits";
    const COLLECTION_PUZZLES = "puzzles";

    /* ------Katerina----- */
    async function getHabits() {
        let client;

        try {
            client = new MongoClient(url);
            await client.connect();
            console.log("Connected to Mongo Server");

            const mongo = client.db(DB_NAME);
            const habitsCollection = mongo.collection(COLLECTION_HABITS);

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
            const habitsCollection = mongo.collection(COLLECTION_HABITS);
            const puzzleCollection = mongo.collection(COLLECTION_PUZZLES);

            const resultHabit = await habitsCollection.deleteOne({
                _id: ObjectId(habitId),
            });

            if (resultHabit.deletedCount === 1) {
                console.log(
                    "Successfully deleted one document in Habits Collection."
                );
            } else {
                console.log(
                    "No documents matched the query in Habits Collection. \
                    Deleted 0 documents."
                );
            }

            const resultPuzzle = await puzzleCollection.deleteOne({
                habitId: ObjectId(habitId),
            });

            if (resultPuzzle.deletedCount === 1) {
                console.log(
                    "Successfully deleted one document in Puzzles Collection."
                );
            } else {
                console.log(
                    "No documents matched the query in Puzzles Collection. \
                    Deleted 0 documents."
                );
            }
            return resultPuzzle;
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
            const habitsCollection = mongo.collection(COLLECTION_HABITS);

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

    async function getPuzzleFromDB(habitId) {
        console.log("got habitId", habitId);
        let client;

        try {
            client = new MongoClient(url);
            await client.connect();
            console.log("Connected to Mongo Server");

            const mongo = client.db(DB_NAME);
            const puzzlesCollection = mongo.collection(COLLECTION_PUZZLES);

            const query = {
                habitId: ObjectId(habitId),
            };

            const puzzle = await puzzlesCollection.findOne(query);
            console.log("RETURNING puzzle", puzzle);

            return puzzle;
        } finally {
            await client.close();
        }
    }

    async function insertPieceOpened(habitId, openPieces) {
        console.log("Inside mongo: got pieceOpenedIndex", openPieces);
        let client;

        try {
            client = new MongoClient(url);
            await client.connect();
            console.log("Connected to Mongo Server");

            const mongo = client.db(DB_NAME);
            const puzzlesCollection = mongo.collection(COLLECTION_PUZZLES);

            const query = {
                habitId: ObjectId(habitId),
            };

            const append = {
                $set: {
                    openPieces: openPieces,
                },
            };

            const result = await puzzlesCollection.updateOne(query, append);
            console.log(result);

            return result;
        } finally {
            await client.close();
        }
    }

    async function updatePuzzleIsCompleted(habitId) {
        console.log("INSIDE updatePuzzleIsCompleted")
        let client;

        try {
            client = new MongoClient(url);
            await client.connect();
            console.log("Connected to Mongo Server");

            const mongo = client.db(DB_NAME);
            //const puzzlesCollection = mongo.collection(COLLECTION_PUZZLES);
            const habitsCollection = mongo.collection(COLLECTION_HABITS);

            const query = {
                _id: ObjectId(habitId),
            };

            const append = {
                $set: {
                    isCompleted: true,
                },
            };

            //const result = await puzzlesCollection.updateOne(query, append);
            const result = await habitsCollection.updateOne(query, append);

            console.log(result);

            return result;
        } finally {
            await client.close();
        }
    }

    db.updatePuzzleIsCompleted = updatePuzzleIsCompleted;
    db.getPuzzleFromDB = getPuzzleFromDB;
    db.insertPieceOpened = insertPieceOpened;
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
            const habitsCollection = mongo.collection(COLLECTION_HABITS);
            const puzzlesCollection = mongo.collection(COLLECTION_PUZZLES);

            let query = {
                habit: habitName,
                startDate: startDate,
                goalPerDay: goalPerDay,
                numberOfDays: numberOfDays,
                picture: picture,
                isCompleted: false,
            };

            console.log(query);

            const result = await habitsCollection.insertOne(query);
            await puzzlesCollection.insertOne({
                habitId: result.insertedId,
                openPieces: new Array(Number(numberOfDays)).fill(false),
            });

            console.log(result);

            return result;
        } finally {
            await client.close();
        }
    }

    async function getHabitsWithAwards() {
        // user id
        let client;

        try {
            client = new MongoClient(url);
            await client.connect();
            console.log("Connected to Mongo Server");

            const mongo = client.db(DB_NAME);
            const habitsCollection = mongo.collection(COLLECTION_HABITS);

            let query = {
                isCompleted: true,
            };

            console.log(query);

            const result = await habitsCollection.find(query).toArray();
            console.log(result);

            return result;
        } finally {
            await client.close();
        }
    }

    db.createHabits = createHabits;
    db.getHabitsWithAwards = getHabitsWithAwards;
    /* ------Anshul End----- */

    return db;
}

export default MongoHabitsModule();
