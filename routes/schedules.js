var express = require('express');

const {get, show, classId, create, update, del } = require("../controller/schedules/index");
const { runValidator, postValidator, putValidator } = require("../controller/schedules/validation");
const router = express.Router();

router.get("/", get);
router.get("/:id", show);
router.get("/class/:classId", classId);
router.post("/", postValidator, runValidator, create);
router.put("/", putValidator, runValidator, update);
router.delete("/:id", del);

module.exports = router;