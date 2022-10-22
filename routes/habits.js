import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongo from '../db/mongoDB.js';

const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//ROUTER TO /api/myhabits
/* ------Katerina----- */

/* GET myhabits */
router.get("/", async function (req, res, next) {
    const myhabits = await mongo.getHabits();
    console.log("got habits", myhabits);
    res.status(200).json(myhabits);
});

/* DELETE myhabits */
router.delete("/:id", async function (req, res, next) {
    console.log("INSIDE DELETE");
    const habitId = Number(req.params.id);  

    console.log("will delete habitId", habitId);
    const result = await mongo.deleteHabit(habitId);

    if (result.acknowledged){
        console.log("habit was deleted");
        res.status(200).send();
    }
    else {
        console.log("no habit was deleted");
    }
    
});


/* ------Katerina end ----- */

export default router;