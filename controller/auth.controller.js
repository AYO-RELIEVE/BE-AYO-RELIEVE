require('dotenv').config()
const { User, RefreshToken, UserOrganizationDetail } = require('../models');
const Validator = require('fastest-validator');
const v = new Validator();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { name, email, password, address, phone_number, status, photo } = req.body

    const schema = {
        name: 'string|empty:false|min:3|max:20',
        email: 'email|empty:false',
        password: 'string|empty:false|min:6',
        address: 'string|empty:false|min:3|max:50',
        phone_number: 'string|empty:false|min:9|max:15',
        status: { type: 'enum', required: true, values: ["organization", "applicant"] },
    }

    if (status === 'organization') {
        schema.description = 'string|empty:false'
        schema.sector = 'string|empty:false'
        schema.media_social = 'string|empty:false'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            message: validate
        });
    }

    const emailUser = await User.findOne({
        where: { email: req.body.email }
    });

    if (emailUser) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        address,
        phone_number,
        status,
        photo
    });

    if (status === 'organization') {
        const userOrganizationDetail = await UserOrganizationDetail.create({
            user_id: user.id,
            description: req.body.description,
            sector: req.body.sector,
            media_social: req.body.media_social
        });
    }

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

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) {
        return res.status(400).json({
            message: "Credentials doesn't match"
        });
    }

    delete user.dataValues.password;

    const token = jwt.sign({ user }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: process.env.JWT_EXPIRED_ACCESS_TOKEN });

    const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: process.env.JWT_EXPIRED_REFRESH_TOKEN });

    await RefreshToken.create({
        token: refreshToken,
        user_id: user.id
    });

    res.status(200).json({
        message: 'Login Success',
        data: { token, refreshToken }
    })
}

const loggedUser = async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: {
            exclude: ['password']
        }
    });

    res.status(200).json({
        data: user
    })
}

module.exports = { register, login, loggedUser };