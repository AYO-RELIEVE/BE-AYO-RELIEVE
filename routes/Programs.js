var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const { Programs } = require("../models");
const v = new Validator();

router.get("/", async (req, res) => {
  const program = await Programs.findAll();
  return res.json(program);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const program = await Programs.findByPk(id);
  return res.json(program || {});
});

router.post("/", async (req, res) => {
  const schema = {
    title: "string",
    description: "string|optional",
    roles: "string",
    thumbnail: "string",
    qouta: "number",
    end_date: "string",
    announcement: "string",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const program = await Programs.create(req.body);
  res.json(program);
});

// router.put("/:id", async (req, res) => {
//   const id = req.params.id;

//   let program = await Programs.findByPk(id);

//   if (!program) {
//     return res.json({ message: "Program not found" });
//   }

//   const schema = {
//     title: "string|optional",
//     description: "string|optional",
//     roles: "string|optional",
//     thumbnail: "string|optional",
//     qouta: "number|optional",
//     end_date: "string|optional",
//     announcement: "string|optional",
//   };

//   const validate = v.validate(req.body, schema);

//   if (validate.length) {
//     return res.status(400).json(validate);
//   }

//   program = await Programs.update(req.body);
//   res.json(program);
// });

// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;

//   const program = await Programs.findByPk(id);

//   if (!program) {
//     return res.json({ message: "Program not found" });
//   }

//   await program.destroyed();

//   res.json({
//     message: "Product is deleted",
//   });
// });

module.exports = router;
