/*****************************************************************************************************
                           ** this file handle route middelware **

    1. use express
    2. create the route path consts ("onlineService", "li", "companies")  to use with the express const
    3. use middleware/error to avoid writing try and catch block throughout all the route flow
    4. export the moudle as a function that get "app" parameter for the main file (server.js)

******************************************************************************************************/

const express = require("express");
const companies = require("../routes/companies");
const onlineService = require("../routes/onlineService");
const li = require("../routes/li");
const users = require("../routes/users");
const error = require("../middleware/error");

module.exports = function (app) {
  // add middelware to route companies

  app.use(express.json());
  app.use("/api/users", users);
  app.use("/companies", companies);
  app.use("/onlineService", onlineService);
  app.use("/li", li);

  // add middelware that handle server or database errors
  app.use(error);
};
