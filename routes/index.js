import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongo from '../db/mongoDB.js';

const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/* ------Katerina----- */

router.use((req, res, next) => {
  res.status(404).sendFile(join(__dirname, "..", "public", "404.html"));
})

/***** RENDERING ********/

/* GET home page. */
router.get("/", (req, res) => {
    res.sendFile(join(__dirname, "..", "public", "index.html"));
});

/* GET myhabits page. */
router.get("/myhabits", (req, res) => {
  res.sendFile(join(__dirname, "..", "public", "myhabits.html"));
});


/***** REST API ********/

/* GET myhabits page. */
router.get("/api/myhabits", async function (req, res, next) {
    const myhabits = await mongo.getHabits();
    res.json(myhabits);

});

/* ------Katerina end----- */




export default router;
