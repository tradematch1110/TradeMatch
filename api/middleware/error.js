/**********************************************************************************************
******* this file is middleare that handle all the errors (execptions) throughout       *******
******* the middleware flow and log into the mongoDB Atlas logs collection                   *******
    1. use logger
    
    
***********************************************************************************************/
const logger2 = require("../startup/logger2");
// catch middleware error
module.exports = function (err, req, res, next) {
  logger2.error(err.message, err);
  // console.log(err.message);
  // winston.log("error", err.message);
  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed!");
};
