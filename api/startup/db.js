/**********************************************************************************************
                ******* this file handle the firbase admin sdk *******

    1. create mongoose instance from mongoose moudle in package json
    2. get configuration from config file
    3. use winstion Logger to console log info (if the db connection is succesed)
    4. init the admin instance with the service accounet
    5. connect to firestore 
    6. create logRef to save all the logs in firestore "logs" collection
    7. create serviceLogRef to save all the service logs in firebase "servicelogs" collection
    8. export "db, admin, logRef, serviceLogRef" to be available throughout the whole app

***********************************************************************************************/

const mongoose = require("mongoose");
const config = require("../config");
const logger = require("./logger");

module.exports = function (app) {
  const dbURI = config.dbUri;

  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => {
      logger.info(`db connected`); 
      app.listen(config.port, config.host);
      logger.info(`Running on http://${config.host}:${config.port}`);
    })
    .catch((err) => logger.info(err)); // need to remove
};
