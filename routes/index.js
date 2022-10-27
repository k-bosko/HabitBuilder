import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fileUpload from "express-fileupload";

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

// router.use((req, res, next) => {
//   res.status(404).sendFile(join(__dirname, "..", "public", "404.html"));
// });

/* ------Katerina end----- */

/* ------Anshul Start ----- */
router.post("/createHabit", fileUpload(), (req, res) => {
  console.log(req);
  let sampleFile;
  if (!req.body.img) {
    sampleFile = req.files.img;
    console.log(sampleFile);
  }
  // res.send("hello");
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv("./" + sampleFile.name, function (err) {
    if (err) return res.status(500).send(err);

    res.send("Received!!!");
  });
});
/* ------Anshul End ----- */

export default router;
