import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongo from '../db/mongoDB.js';

const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/* ------Katerina----- */

/***** RENDERING ********/

/* GET home page. */
router.get("/", function (req, res, next) {
    res.sendFile(join(__dirname, "..", "public", "index.html"));
});

/* GET myhabits page. */
router.get("/myhabits", function (req, res, next) {
  res.sendFile(join(__dirname, "..", "public", "myhabits.html"));
});


/***** REST API ********/

/* GET myhabits page. */
router.get("/api/myhabits", async function (req, res, next) {
    const myhabits = await mongo.getHabits();

    // for (let habit of myhabits){
    //     console.log("habit:", habit.habit_name);
    // }
    res.json(myhabits);

});



/* ------Katerina end----- */

export default router;
