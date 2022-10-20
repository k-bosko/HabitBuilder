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
router.get("/", (req, res) => {
    res.status(200).sendFile(join(__dirname, "..", "public", "index.html"));
});

/* GET myhabits page. */
router.get("/myhabits", (req, res) => {
  res.status(200).sendFile(join(__dirname, "..", "public", "myhabits.html"));
});


/***** REST API ********/

/* GET myhabits page. */
router.get("/api/myhabits", async function (req, res, next) {
    const myhabits = await mongo.getHabits();
    res.status(200).json(myhabits);

});

/* ------Katerina end----- */

/***** HANDLING 404 ********/
//NOTE must be at the end

router.all('*', (req, res) => {
    res.status(404).sendFile(join(__dirname, "..", "public", "404.html"));
});



export default router;
