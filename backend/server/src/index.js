import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
console.log(process.env.JWT_SECRET);

import express from 'express';
import { join } from 'path';
import config from './config/config';
import courses from './routes/courses';
import users from './routes/users';
import auth from './routes/auth'
import passport from './config/passport'
import { notFound, catchErrors } from './middlewares/errors';
import bodyParser from 'body-parser';
import register from 'babel-core/register';
import babelPolyfill from 'babel-polyfill';

// Configure passport
passport();


// Connect to database
import dbConfig from './config/database';
import mongoose from 'mongoose';

mongoose.connect(dbConfig.mongoUrl);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

const app = express();
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration
app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes config
app.use('/api/courses', courses());
app.use('/api/auth', auth());
app.use('/api/users', users());

// errors handling
app.use(notFound);
app.use(catchErrors);

// let's play!
app.listen(config.server.port, () => {
    console.log(`Server is up!`);
});