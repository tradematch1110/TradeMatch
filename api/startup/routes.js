/*****************************************************************************************************
                           ** this file handle route middelware **

    1. use express
    2. create the route path consts ("onlineService", "li", "companies")  to use with the express const
    3. use middleware/error to avoid writing try and catch block throughout all the route flow
    4. export the moudle as a function that get "app" parameter for the main file (server.js)

******************************************************************************************************/

const express = require("express");
const categories = require("../routes/categories");
const products = require("../routes/products");
const users = require("../routes/users");
const admin = require("../routes/admin");
const error = require("../middleware/error");

module.exports = function (app) {
  // add middelware to route companies

  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/categories", categories);
  app.use("/api/products", products);
  app.use("/api/admin", admin);


  // add middelware that handle server or database errors
  app.use(error);
};
