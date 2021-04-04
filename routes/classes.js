var express = require('express');

const { get, show, create, update, del } = require("../controller/classes/index");
const { runValidator, postValidator, putValidator } = require("../controller/classes/validation");
const multer = require('multer')
const os = require('os')
const router = express.Router();

router.get("/", get);
router.get("/:id", show);
router.post("/",multer({dest: os.tmpdir()}).single('photo'), postValidator, runValidator, create);
router.put("/",multer({dest: os.tmpdir()}).single('photo'), update);
router.delete("/", del);

module.exports = router;
