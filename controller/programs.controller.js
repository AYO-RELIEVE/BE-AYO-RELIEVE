const Validator = require('fastest-validator');
const v = new Validator();
const { Program } = require("../models");

const index = async (req, res) => {
    const programs = await Program.findAll({
        include: {
            association: "category",
        },
    });

    return res.status(200).json({
        data: programs
    });
}

const show = async (req, res) => {
    const { id } = req.params;
    const program = await Program.findByPk(id, {
        include: {
            association: "category",
        },
    });

    if (!program) {
        return res.status(404).json({
            message: "Program not found"
        });
    }

    return res.status(200).json({
        data: program
    });
}

const create = async (req, res) => {
    const schema = {
        title: "string|empty:false|min:3|max:50",
        description: "string|optional",
        rules: "string",
        thumbnail: "string|optional:true",
        qouta: "number",
        end_date: "string",
        announcement_date: "string",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            message: validate
        });
    }

    const program = await Program.create(req.body);

    return res.status(201).json({
        data: program
    });
}

const update = async (req, res) => {
    const schema = {
        title: "string|empty:false|min:3|max:50",
        description: "string|optional",
        rules: "string",
        thumbnail: "string|optional:true",
        qouta: "number",
        end_date: "string",
        announcement_date: "string",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    const { id } = req.params;
    const { title, description, rules, thumbnail, qouta, end_date, announcement_date } = req.body

    const program = await Program.findByPk(id);

    if (!program) {
        return res.status(404).json({
            message: "Program not found",
        });
    }

    program.title = title;
    program.description = description;
    program.rules = rules;
    program.thumbnail = thumbnail;
    program.qouta = qouta;
    program.end_date = end_date;
    program.announcement_date = announcement_date;

    await program.save();

    res.json({
        message: "Program updated",
    });
}

const destroy = async (req, res) => {
    const id = req.params.id;
    const program = await Program.findByPk(id);

    if (!program) {
        return res.status(404).json({
            message: "Program not found",
        });
    }

    await program.destroy();

    res.json({
        message: "Program deleted",
    });
}

module.exports = { index, show, create, update, destroy };