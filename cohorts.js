// set up our dependencies
const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

// now, activate said dependencies
const server = express.Router();
server.use(express.json());

// connect to database
const db = knex(knexConfig.development);

// list cohorts - figure out how to make exact
server.get("/:id/students", (req, res) => {
  const id = req.params.id;
  db.select("students.*")
    .from("cohorts")
    .join("students", "cohorts.id", "=", "students.cohort_id")
    .where("cohorts.id", id)
    .then(student => {
      res.status(200).json(student);
    })
    .catch(err => res.status(500).json(err));
});

// get specific cohort
server.get("/:id", (req, res) => {
  const id = req.params.id;

  db.select()
    .from("cohorts")
    .where({ id })
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json(err));
});

// list cohorts
server.get("/", (req, res) => {
  db.select("*")
    .from("cohorts")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});

// add cohorts
server.post("/", (req, res) => {
  db("cohorts")
    // db.insert(req.body).into('bears').then().catch()
    .insert(req.body)
    // get back an array of ids
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// delete cohorts
server.delete("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// edit cohorts

server.put("/:id", (req, res) => {
  const changes = req.body;
  db("cohorts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Cohort not found, yo. Try again!" });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;
