const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');
const programsRouter = require('./routes/programs');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: '*'
}));

app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/programs', programsRouter);

module.exports = app;
