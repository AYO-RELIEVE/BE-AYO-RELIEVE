const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');

const app = express();

//umar
require("dotenv").config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/categories', categoriesRouter);

//umar
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/programs", programsRouter);

module.exports = app;
