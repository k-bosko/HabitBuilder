import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fileUpload from "express-fileupload";
import mongo from "../db/mongoDB.js";

const router = express.Router();


/* ------Katerina----- */

/* GET home page. */
router.get("/", (req, res) => {
    res.redirect("/index.html");
});

/* GET myhabits page. */
router.get("/myhabits", (req, res) => {
    res.redirect("/myhabits.html");
});

router.use((req, res) => {
    res.status(404).redirect("/404.html");
});

/* ------Katerina end----- */

/* ------Anshul Start ----- */
router.post("/createHabit", fileUpload(), async (req, res) => {
    console.log(req.files);
    if (req.files) {
        let file;

        file = req.files.img;
        let uploadPath = "./public/assets/images/" + file.name;
        console.log(uploadPath);
        try {
            // Use the mv() method to place the file somewhere on your server
            await file.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err);

                // res.send("Received!!!");
            });
            let { habitName, goalPerDay, startDate, numberOfDays, picture } =
                req.body;
            picture = uploadPath;
            mongo.createHabits(
                habitName,
                goalPerDay,
                startDate,
                numberOfDays,
                picture
            );
            //res.send("Usign custom images");
            res.redirect("/myhabits.html");
        } catch (e) {
            console.log("Error", e);
            res.status(400).send({ err: e });
        }
    } else {
        // check which image has been selected and assign a value
        // if its beach set the path in it as the
        const { habitName, goalPerDay, startDate, numberOfDays, picture } =
            req.body;
        mongo.createHabits(
            habitName,
            goalPerDay,
            startDate,
            numberOfDays,
            picture
        );
        console.log(req.body.picture);
        //res.send("Usign default images");
        res.redirect("/myhabits.html");
    }
});
/* ------Anshul End ----- */

export default router;
