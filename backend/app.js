const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const initializeRoutes = require('./routes');  

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Log API Endpoints
app.use(morgan("dev"));

 // Default route definition 
app.get("/", (req, res) => res.send("Welcome to Snapnet."));

// Routes for the end-points 
initializeRoutes(app);

module.exports = app;
