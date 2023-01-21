const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Log an error if the connection fails
db.on("error", console.error.bind(console, "connection error:"));

// Log a success message if the connection is successful
db.once("open", () => {
  console.log("Successfully connected to MongoDB");
});

const app = express();
app.use(cors());

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const auth_routes = require("./Routes/UserRoutes");

app.use("/api/auth", auth_routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
