/**********************************************************************************************
 *******     this file create Logger object from winston package for all env     *******

  1. use winston
  2. use winston-mongodb to upload logs into mongodb atlas
  3. use express-async-errors to catch all errors in the middleware proccess 
     and update logs in the mongodb atlas
  4. handle rejections and update logs in the mongodb atlas
  5. handle exceptions and update logs in the mongodb atlas
  4. export Logger function

***********************************************************************************************/

const { format, createLogger, transports } = require("winston");
const { timestamp, combine, errors, json, printf, metadata } = format;
require("winston-mongodb");
require("express-async-errors");
const config = require("../config");

// const logFormat = printf(({ level, message, timestamp, stack }) => {
//   return `${timestamp} ${level}: ${stack || message} `;
// });

const logger = createLogger({
  useUnifiedTopology: true,
  level: "info",
  format: combine(
    json(),
    timestamp(),
    errors({ stack: true }),
    metadata()
    // logFormat
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.Console(),
    new transports.File({ filename: "logfile.log", level: "info" }),
    // new transports.File({ filename: "input_output.log", level: "debug" }),
    new transports.MongoDB({
      db: config.dbUri,
      level: "warn",
    }),
  ],
});

logger.rejections.handle(new transports.File({ filename: "rejections.log" }));
logger.exceptions.handle(new transports.File({ filename: "exceptions.log" }));
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

module.exports = logger;
