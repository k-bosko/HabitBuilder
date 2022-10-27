import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mongo from "../db/mongoDB.js";
import fileUpload from "express-fileupload";

const router = express.Router();


//ROUTER TO /api/myhabits
/* ------Katerina----- */

/* GET myhabits */
router.get("/", async function (req, res) {
    const myhabits = await mongo.getHabits();
    console.log("got habits", myhabits);
    res.status(200).json(myhabits);
});

/* DELETE myhabits */
router.delete("/:id", async function (req, res) {
    const habitId = Number(req.params.id);

    console.log("will delete habitId", habitId);
    const result = await mongo.deleteHabit(habitId);

    if (result.acknowledged) {
        console.log("habit was deleted");
        res.status(200).send();
    } else {
        console.log("no habit was deleted");
    }
});
/* ------Katerina end ----- */

// /* ------Anshul Start ----- */
// router.post("/createHabit", fileUpload(), (req, res) => {
//     console.log(req);
//     console.log(res);
//     res.send("Received!!!");

// let sampleFile = req.files.fileName;

// // Use the mv() method to place the file somewhere on your server
// sampleFile.mv("./" + sampleFile.name, function (err) {
//   if (err) return res.status(500).send(err);

//   res.send("Received!!!");
// });
// });
// /* ------Anshul End ----- */

/* ------Katerina start ----- */
/* POST myhabits log */
router.post("/:id/log", async function (req, res) {
    const habitId = Number(req.params.id);
    console.log("habitId=", habitId);

    const logUnits = Number(req.body.logUnits);
    console.log("logUnits=", logUnits);

    await mongo.insertLogUnits(habitId, logUnits);

    //TODO add error handling
});

/* ------Katerina end ----- */

export default router;
