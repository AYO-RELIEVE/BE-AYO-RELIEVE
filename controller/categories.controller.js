const Validator = require('fastest-validator');
const v = new Validator();
const { Category } = require('../models');

const index = async (req, res) => {
    const categories = await Category.findAll();

    res.status(200).json({
        data: categories
    });
}

const show = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    res.status(200).json({
        data: category
    });
}

const create = async (req, res) => {
    const schema = {
        name: 'string|empty:false|min:3|max:20',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            message: validate
        });
    }

    const { name } = req.body;

    const category = await Category.findOne({ where: { name } });

    if (category) {
        return res.status(400).json({
            message: 'Category already exists'
        });
    }

    const newCategory = await Category.create({ name });

    res.status(201).json({
        data: newCategory
    });
}

const update = async (req, res) => {
    const schema = {
        name: 'string|empty:false|min:3|max:20',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            message: validate
        });
    }

    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);

    if (!category) {
        return res.status(404).json({
            message: 'Category not found'
        });
    }

    const oldCategory = await Category.findOne({ where: { name } });

    if (oldCategory && oldCategory.id != id) {
        return res.status(200).json({
            message: 'Category already exists'
        });
    }

    category.name = name;
    await category.save();

    res.status(200).json({
        data: category
    });
}

const destroy = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
        return res.status(404).json({
            message: 'Category not found'
        });
    }

    await category.destroy();

    res.status(200).json({
        message: 'Category deleted'
    });
}

module.exports = { index, show, create, update, destroy };