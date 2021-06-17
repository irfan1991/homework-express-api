var express = require('express');

const { create, get, getUser } = require("../controller/join_classes/index");
const router = express.Router();
const { runValidator, postValidator, putValidator } = require("../controller/join_classes/validation");
const { checkToken } = require("../middleware/jwt");

// router.get("/users", checkToken, runValidator, getUser);
// router.get("/classes", checkToken, runValidator, get);
router.get("/users/:id", runValidator, getUser);
router.get("/classes", runValidator, get);
router.post("/", checkToken, postValidator, runValidator, create);

module.exports = router;