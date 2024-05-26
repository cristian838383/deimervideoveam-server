const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const api = require('./router/manteniceData');
const { API_VERSION } = require('./constants');

const app = express();
// Import routings
const videobeam = require('./router/videobeam');
const room = require('./router/room');
const facturaprestamo = require('./router/facturaprestamo');


// Configure Bory Parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static('uploads'));

// Configure Header HTTP - CORS
app.use(cors());

// Configure routings
app.use(`/api/${API_VERSION}`, videobeam);
app.use(`/api/${API_VERSION}`, room);
app.use(`/api/${API_VERSION}`, facturaprestamo);


module.exports = app;
