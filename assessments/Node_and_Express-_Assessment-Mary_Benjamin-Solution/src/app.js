const express = require("express");
const morgan = require("morgan");
const app = express();

const getZoos = require("./utils/getZoos");
//middleware
const validateZip = require("./middleware/validateZip");

app.use(morgan("dev"));

app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const existing = getZoos(zip);
  if (existing) {
    res.send(`${zip} exists in our records.`);
  } else {
    res.send(`${zip} does not exist in our records.`);
  }
});

app.get("/zoos/all", (req, res, next) => {
  const admin = req.query.admin;
  const all = getZoos();
  if (admin === "true") {
    res.send(`All zoos: ${all.join("; ")}`);
  } else {
    res.send("You do not have access to that route.");
  }
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const existing = getZoos(zip);
  if (existing.length) {
    res.send(`${zip} zoos: ${existing.join("; ")}`);
  } else {
    res.send(`${zip} has no zoos.`);
  }
});

//error handle
app.use((req, res, next) => {
  next("That route could not be found!");
});
app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;
