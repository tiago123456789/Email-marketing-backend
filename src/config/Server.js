const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./Database");
const routesApp = require("../routes");

// Setting middleware make parse datas to json.
app.use(bodyParser.json());

// Setting routes application.
routesApp(app);
    
module.exports = app;
