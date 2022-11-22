const express = require("express");
const router = express.Router();

const { auth, roles } = require("../middleware");
const { index, show, create, update, destroy, apply } = require("../controller/programs.controller");

router.get("/", index);
router.get("/:id", show);
router.post("/", auth, roles('organization'), create);
router.put("/:id", auth, roles('organization'), update);
router.delete("/:id", auth, roles('organization'), destroy);

router.post("/:id/apply", auth, roles('applicant'), apply);

module.exports = router;
