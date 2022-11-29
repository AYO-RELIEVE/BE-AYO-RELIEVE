const express = require("express");
const router = express.Router();

const { auth, roles } = require("../middleware");
const { index, show, create, update, destroy, apply, approve, reject, myPrograms } = require("../controller/programs.controller");

router.get("/", index);
router.get("/my-programs", auth, roles('applicant'), myPrograms)
router.get("/:id", show);
router.post("/", auth, roles('organization'), create);
router.put("/:id", auth, roles('organization'), update);
router.delete("/:id", auth, roles('organization'), destroy);


router.post("/:id/apply", auth, roles('applicant'), apply);
router.put("/:id/approve/:user_id", auth, roles('organization'), approve);
router.put("/:id/reject/:user_id", auth, roles('organization'), reject);

module.exports = router;
