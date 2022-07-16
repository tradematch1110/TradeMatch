/*****************************************************************************************************
* this file provided the option to console log if the service running in Docker (container) or not  **

    1. create getDockerHost instance from "get-docker-host" moudle in package json
    2. create isInDocker instance from "is-in-docker" moudle in package json
    3. use winstion Logger to console log info 

******************************************************************************************************/

const getDockerHost = require("get-docker-host");
const isInDocker = require("is-in-docker");

module.exports = function () {
  checkDocker = () => {
    return new Promise((resolve, reject) => {
      if (isInDocker()) {
        getDockerHost((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
      } else {
        resolve(null);
      }
    });
  };

  checkDocker()
    .then((addr) => {
      if (addr) {
        for (let index = 0; index < 10; index++) {
          console.log("Docker host is " + addr);
        }
        for (let index = 0; index < 5; index++) {
          console.log(
            "*******************************************************"
          );
        }
      } else {
        for (let index = 0; index < 1; index++) {
          console.log("Not in Docker");
        }
      }
    })
    .catch((error) => {
      for (let index = 0; index < 10; index++)
        console.log("Could not find Docker host: " + error);
    });
};
