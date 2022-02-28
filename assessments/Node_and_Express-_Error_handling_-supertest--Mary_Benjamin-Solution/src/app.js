const { NODE_ENV = "development" } = process.env;
const express = require("express");
const app = express();

// Routes
app.get("/send/:message", (req, res, next) => {
  const message = req.params.message;
  if (message.length < 3) return next("Your message is too short!");
  res.send(`Your message: ${message}`);
});

// Error Handling
//not found
app.use((req, res, next) => {
  res.send('An error occurred: Could not find route.')
})

//error
app.use((err, req, res, next) => {
  res.send(`An error occurred: ${err}`)
})
module.exports = app;
