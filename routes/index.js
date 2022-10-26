import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/* ------Katerina----- */


/* GET home page. */
router.get("/", (req, res) => {
    res.redirect("/index.html");
});

/* GET myhabits page. */
router.get("/myhabits", (req, res) => {
    res.redirect("/myhabits.html");
});

router.use((req, res, next) => {
    res.status(404).sendFile(join(__dirname, "..", "public", "404.html"));
});

/* ------Katerina end----- */




export default router;
