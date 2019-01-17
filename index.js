// set up our dependencies
const express = require("express");

// now, activate said dependencies
const server = express();

// add router so code is more readable
const cohortRouter = require("./cohorts");
const studentRouter = require("./students");

server.use(express.json());

server.use("/api/cohorts", cohortRouter);
server.use("/api/students", studentRouter);

server.get("/", (req, res) => {
  res.send("wooot, api working now!");
});

server.listen(7000, () => console.log("server up on 7000 - Happiness now."));
