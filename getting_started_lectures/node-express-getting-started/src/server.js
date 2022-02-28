const {PORT = 3000} = process.env;

const app = require("./app")

const listener = () => console.log(`Listening to ${PORT}!`);
app.listen(PORT, listener);

// app.listen(PORT, () => console.log(`Listening on Port ${PORT}!`)) // same