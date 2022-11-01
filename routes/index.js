import express from "express";
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

/* ------Katerina end----- */

router.use((req, res) => {
    console.log(req);
    res.status(404).redirect("/404.html");
});

export default router;
