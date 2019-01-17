// set up our dependencies
const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

// now, activate said dependencies
const server = express.Router();
server.use(express.json());

// connect to database
const db = knex(knexConfig.development);

module.exports = server;
