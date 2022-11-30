const Validator = require('fastest-validator');
const v = new Validator();
const { Program, ProgramUser, User } = require("../models");
const { unlinkSync } = require("fs");
const { generateSlug } = require('../utils/helpers');

const index = async (req, res) => {
    const programs = await Program.findAll({});

    return res.status(200).json({
        data: programs
    });
}

const show = async (req, res) => {
    const { id } = req.params;
    const program = await Program.findByPk(id);

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
        // qouta: "number",
        end_date: "string",
        announcement_date: "string",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            message: validate
        });
    }

    const program = await Program.create({
        organization_id: req.user.id,
        thumbnail: req.file ? `images/${req.file.filename}` : null,
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
        // qouta: "number",
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

    if (req.file) {
        if (program.thumbnail) {
            const filename = program.thumbnail.split("/")[1];
            unlinkSync(`public/images/${filename}`);
        }
        program.thumbnail = `images/${req.file.filename}`;
    }

    program.title = title;
    program.description = description;
    program.rules = rules;
    program.qouta = qouta;
    program.end_date = end_date;
    program.announcement_date = announcement_date;

    await program.save();

    res.status(200).json({
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

    res.status(200).json({
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

    const userApplied = await program.hasApplicant(req.user.id);

    if (userApplied) {
        return res.status(400).json({
            message: "You have already applied for this program"
        });
    }

    await program.addApplicant(req.user.id);

    res.status(200).json({
        message: "You have successfully applied for this program"
    });
}

const approve = async (req, res) => {
    const { id, user_id } = req.params;
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

    const userApplied = await program.hasApplicant(parseInt(user_id));

    if (!userApplied) {
        return res.status(400).json({
            message: "User has not applied for this program"
        });
    }

    const programUsers = await ProgramUser.findOne({
        where: {
            program_id: id,
            user_id: user_id,
        }
    });

    programUsers.status = "Diterima";
    await programUsers.save();

    res.status(200).json({
        message: "User has been approved for this program"
    });
}

const reject = async (req, res) => {
    const { id, user_id } = req.params;
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

    const userApplied = await program.hasApplicant(parseInt(user_id));

    if (!userApplied) {
        return res.status(400).json({
            message: "User has not applied for this program"
        });
    }

    const programUsers = await ProgramUser.findOne({
        where: {
            program_id: id,
            user_id: user_id,
        }
    });

    programUsers.status = "Ditolak";
    await programUsers.save();

    res.status(200).json({
        message: "User has been rejected for this program"
    });
}

const myPrograms = async (req, res) => {
    const userPrograms = await User.findByPk(req.user.id, {
        include: [{
            model: Program,
            as: "program_programs",
            through: {
                attributes: ["status"]
            }
        }]
    });

    return res.status(200).json({
        data: userPrograms.program_programs
    });
}

module.exports = { index, show, create, update, destroy, apply, approve, reject, myPrograms };