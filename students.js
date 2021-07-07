// set up our dependencies
const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

// now, activate said dependencies
const server = express.Router();
server.use(express.json());

// connect to database
const db = knex(knexConfig.development);

// trick from Jonathan Heniz - makes the code a little more destructured
const table = "students";
// Let's try something a little bit new. ASYNC/ AWAIT with TRY AND CATCh

// GET ALL STUDENTS: First, let's get that good stuff;
server.get("/", async (req, res) => {
  // first, try it out. everyone deserves a chance.
  try {
    // need to ask why we need to turn the returned data into results - i guess we need another helper function?
    const results = await db.select().from(table);
    // send our results back as json
    res.status(200).json(results);
  } catch (err) {
    // and if it fails, catch our friend. Can't leave anyone behind in this world.
    err => {
      res.status(500).json(err);
    };
  }
});

// Now, let's get a particular student

server.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const student = await db
      .select()
      .from(table)
      .where({ id });

    res.status(200).json(student);
  } catch (err) {
    err => {
      res.status(500).json(err);
    };
  }
});
module.exports = server;
