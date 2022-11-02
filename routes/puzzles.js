import express from "express";
import mongo from "../db/mongoDB.js";

const router = express.Router();

//ROUTER TO /api/puzzles
/* ------Katerina----- */

/* POST puzzles  */
router.post("/:habitId/clicked", async function (req, res) {
    const habitId = req.params.habitId;
    const openPieces = req.body.openPieces;

    await mongo.insertPieceOpened(habitId, openPieces);
    //TODO add error handling
    res.status(200).send();
});

router.get("/:habitId/completed", async function (req, res) {
    const habitId = req.params.habitId;

    await mongo.updatePuzzleIsCompleted(habitId);
    //TODO add error handling
    res.status(200).send();
});



router.get("/:habitId", async function (req, res) {
    const habitId = req.params.habitId;

    const puzzleData = await mongo.getPuzzleFromDB(habitId);
    //TODO add error handling
    res.status(200).json(puzzleData);
});

export default router;
/* ------Katerina end----- */
