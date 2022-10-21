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
// router.delete("/:id", async function (req, res, next) {
router.get("/:id", async function (req, res, next) {
    const habitId = Number(req.params.id);
    const habit = await mongo.getHabit(habitId);

    console.log("will delete habit", habit);
    await mongo.deleteHabit(habitId);

    console.log("Habit deleted");

    res.redirect(`../../myhabits`);
    //TODO add error handling
});

/* ------Katerina end ----- */

export default router;