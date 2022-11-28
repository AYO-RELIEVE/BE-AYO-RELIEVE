const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const authRouter = require('./routes/auth');
const programsRouter = require('./routes/programs');
const organizationsRouter = require('./routes/organizations');

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
app.use('/api/programs', programsRouter);
app.use('/api/organizations', organizationsRouter);

module.exports = app;
