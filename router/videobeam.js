const express = require('express');
const { postVideobeam, getVideobeam, updateVideobeam } = require('../controllers/videobeam');

const api = express.Router();

api.get("/videobeam", getVideobeam);
api.post("/videobeam", postVideobeam);
api.put("/videobeam", updateVideobeam);

module.exports = api;
