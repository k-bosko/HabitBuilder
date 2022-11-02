import express from "express";

const router = express.Router();

/* ------Katerina----- */

/* GET home page. */
router.get("/", (req, res) => {
    res.redirect("./index.html");
});

/* GET myhabits page. */
router.get("/myhabits", (req, res) => {
    res.redirect("./myhabits.html");
});

router.use((req, res) => {
    res.status(404).redirect("./404.html");
});
/* ------Katerina end----- */

export default router;
