require('dotenv').config()
const { User, RefreshToken, UserOrganizationDetail, UserApplicantDetail } = require('../models');
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

    if (status === 'applicant') {
        schema.date_of_birth = 'string|empty:false'
        schema.religion = 'string|empty:false'
        schema.married = 'boolean|empty:false'
        schema.identity_card = 'string|optional:true'
        schema.profession = 'string|empty:false'
        schema.disability = 'boolean|empty:false'
        schema.lsm = 'boolean|empty:false'
        schema.lsm_name = 'string|optional:true'
        schema.lsm_membership = 'string|optional:true'
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

    if (status === 'applicant') {
        const { date_of_birth, religion, married, identity_card, profession, disability, proof_of_disability, lsm, lsm_name, lsm_membership } = req.body

        const userApplicantDetail = await UserApplicantDetail.create({
            user_id: user.id,
            date_of_birth,
            religion,
            married,
            identity_card,
            profession,
            disability,
            proof_of_disability,
            lsm,
            lsm_name,
            lsm_membership,
        });
    }

    if (status === 'organization') {
        const { description, sector, media_social } = req.body

        const userOrganizationDetail = await UserOrganizationDetail.create({
            user_id: user.id,
            description,
            sector,
            media_social
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