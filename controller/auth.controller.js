const { User } = require('../models');
const Validator = require('fastest-validator');
const v = new Validator();
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const schema = {
        name: 'string|empty:false|min:3|max:20',
        email: 'email|empty:false',
        password: 'string|empty:false|min:6',
        address: 'string|empty:false|min:3|max:50',
        phone_number: 'string|empty:false|min:9|max:15',
        status: { type: 'enum', required: true, values: ["organization", "applicant"] },
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            message: validate
        });
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
        ...req.body,
        password
    });

    res.status(201).json({
        message: 'Register Success'
    })
}

const login = async (req, res) => {
    const schema = {
        email: 'email|empty:false',
        password: 'string|empty:false|min:6',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            message: validate
        });
    }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (!user) {
        return res.status(400).json({
            message: "Credentials doesn't match"
        });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
        return res.status(400).json({
            message: "Credentials doesn't match"
        });
    }

    res.status(200).json({
        message: 'Login Success',
        data: user
    })
}

module.exports = { register, login };