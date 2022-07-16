/**********************************************************************************************
 *******     this file create Logger object from winston package for all env     *******

  1. use winston
  2. use for input output file in order to log request ditels and respond result to local file

***********************************************************************************************/

const { format, createLogger, transports } = require("winston");
const { timestamp, combine, errors, json, printf, metadata } = format;
require("winston-mongodb");
require("express-async-errors");
const config = require("../config");

const logFormat = printf(({ level, message, stack }) => {
  return `${level}: ${stack || message} `;
});

const logger2 = createLogger({
  format: combine(
    printf((info) => {
      if (typeof info.message === "object") {
        info.message = JSON.stringify(info.message, null, 3);
      }

      return info.message;
    }),
    logFormat
  ),

  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.File({ filename: "input_output.log", level: "debug" }),
  ],
});

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

module.exports = logger2;
