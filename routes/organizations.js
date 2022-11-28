const express = require("express");
const { listApplicant, listProgram } = require("../controller/organization.controller");
const router = express.Router();

const { auth, roles } = require("../middleware");

router.get("/programs", auth, roles("organization"), listProgram)
router.get("/programs/:id", auth, roles("organization"), listApplicant)
module.exports = router;
