var express = require('express');

const { create, get } = require("../controller/join_classes/index");
const router = express.Router();
const { runValidator, postValidator, putValidator } = require("../controller/join_classes/validation");
const { checkToken }= require("../middleware/jwt");

router.get("/users", checkToken,runValidator, get);
router.post("/", checkToken,runValidator, postValidator,create);

module.exports = router;
