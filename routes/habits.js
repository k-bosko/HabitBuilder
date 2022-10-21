import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongo from '../db/mongoDB.js';

const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//ROUTER TO /api/myhabits
/* ------Katerina----- */

/* GET myhabits page. */
router.get("/", async function (req, res, next) {
    const myhabits = await mongo.getHabits();
    res.status(200).json(myhabits);
});

/* ------Katerina end ----- */

export default router;