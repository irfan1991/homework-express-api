var express = require('express');

const { get, show, create, update, del } = require("../controller/materials/index");
const { runValidator, postValidator, putValidator } = require("../controller/materials/validation");
const multer = require('multer')
const os = require('os')
const router = express.Router();

router.get("/", get);
router.get("/:id", show);
router.post("/",multer({dest: os.tmpdir()}).single('file'), postValidator, runValidator, create);
router.put("/",multer({dest: os.tmpdir()}).single('file'), putValidator, runValidator, update);
router.delete("/", del);

module.exports = router;
