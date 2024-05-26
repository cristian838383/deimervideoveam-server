const express = require('express');
const { postFacturaprestamo, getFacturaprestamo } = require('../controllers/facturaprestamo');

const api = express.Router();

api.get("/facturaprestamo", getFacturaprestamo);
api.post("/facturaprestamo", postFacturaprestamo);

module.exports = api;
