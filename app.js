//package imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

//local imports
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const classRoutes = require('./routes/class');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/error-handler');

//environment variables
const port = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

//main application
const app = express();
app.use(express.json());

// enabeling cross-origin resources
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
})

//routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/classes', classRoutes);

// error handler
app.use(errorHandler);

//database connection
mongoose.connect(DB_URI, () => {

    logger.info('database connected successfully!')

    app.listen(port, () => {
        logger.info(`server started at port: ${port}`);
    })

});
