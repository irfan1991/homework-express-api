var express = require('express');

const { login, loginValidation } = require("../controller/users/login");
const { profile, updateProfile } = require("../controller/users/profile");
const { runValidator, postValidator, putValidator } = require("../controller/users/validation");
const { checkToken }= require("../middleware/jwt");
const router = express.Router();

router.post("/login", loginValidation, runValidator, login);
router.get("/profile", checkToken, profile);
router.put("/profile", checkToken, updateProfile);


module.exports = router;
