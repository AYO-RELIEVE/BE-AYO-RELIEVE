const Validator = require('fastest-validator');
const v = new Validator();
const { Program, Category } = require("../models");

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

    const category = await Category.findByPk(req.body.category_id);

    if (!category) {
        return res.status(404).json({
            message: "Category not found"
        });
    }

    const program = await Program.create({
        organization_id: req.user.id,
        ...req.body,
    });

    return res.status(201).json({
        data: program
    });
}

const update = async (req, res) => {
    const { id } = req.params;
    const { title, description, rules, thumbnail, qouta, end_date, announcement_date } = req.body

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

    const program = await Program.findByPk(id);

    if (!program) {
        return res.status(404).json({
            message: "Program not found",
        });
    }

    if (req.user.id != program.organization_id) {
        return res.status(403).json({
            message: "You are not authorized to update this program"
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
        data: program
    });
}

const destroy = async (req, res) => {
    const { id } = req.params;
    const program = await Program.findByPk(id);

    if (!program) {
        return res.status(404).json({
            message: "Program not found",
        });
    }

    if (req.user.id != program.organization_id) {
        return res.status(403).json({
            message: "You are not authorized to update this program"
        });
    }

    await program.destroy();

    res.json({
        message: "Program deleted",
    });
}

const apply = async (req, res) => {
    const { id } = req.params;
    const program = await Program.findByPk(id);

    if (!program) {
        return res.status(404).json({
            message: "Program not found",
        });
    }

    const userApplied = await program.hasProgram_users(req.user.id);

    if (userApplied) {
        return res.status(400).json({
            message: "You have already applied for this program"
        });
    }

    await program.addProgram_users(req.user.id);

    res.json({
        message: "You have successfully applied for this program"
    });
}

module.exports = { index, show, create, update, destroy, apply };