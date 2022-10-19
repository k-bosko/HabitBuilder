import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* GET home page. */
router.get("/", function (req, res, next) {
    res.sendFile(join(__dirname, "..", "public", "index.html"));
});

/* GET myhabits page. */
router.get("/myhabits", function (req, res, next) {
  res.sendFile(join(__dirname, "..", "public", "myhabits.html"));
});

export default router;
