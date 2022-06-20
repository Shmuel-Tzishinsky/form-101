/* eslint-disable no-console */
const express = require('express');

const app = express();

// Import Routes
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const foems101Route = require('./server/routes/form101');
const authRoute = require('./server/routes/auth');
const userRoute = require('./server/routes/user');

const companysRoute = require('./server/routes/companys');
const formsRoute = require('./server/routes/forms.js');
const connectDB = require('./server/config/db');

require('dotenv').config();

// Norgan
app.use(morgan('dev'));

// Connect to DB
connectDB();

const port = process.env.PORT || 5000;

app.use('/server/static', express.static(__dirname + '/server/static'));
// Middleware
app.use(express.json({ limit: '50mb' }));
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); //Make sure u have added this line
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());
app.use(cors());

// Route middlewares
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/companys', companysRoute);
app.use('/api/forms', formsRoute);
app.use('/api/form101', foems101Route);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
  });
}

module.exports = app.listen(port, () => console.log('Server up and running'));
