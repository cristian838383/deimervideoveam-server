const express = require('express');
const { postRoom, getRoom } = require('../controllers/room');

const api = express.Router();

api.get("/room", getRoom);
api.post("/room", postRoom);

module.exports = api;
