/**********************************************************************************************
                ******* this file handle doctors online service routes  *******

  1. use express
  2. use logger 
  3. use route from express 
  4. use [getAllOnlineService, getOnlineServiceByName, getPriceOffer] functions 
     as middlewares form onlineServiceController

***********************************************************************************************/

const express = require("express");
const logger = require("../startup/logger");
const {
  getAllOnlineService,
  getOnlineServiceByName,
  getPriceOffer,
} = require("../controllers/onlineServiceController");
// const validateObjectName = require("../middleware/validateObjectName");

const router = express.Router();
// get all companies
router.get("/all", getAllOnlineService);
//get company by name
router.get("/:name", getOnlineServiceByName);
// return priceoffer
router.post("/priceoffer", getPriceOffer, async (req, res) => {});

// router.get("/:name",[auth, admin] ,(req, res) => {
//   // add two middeleware functions
// });

module.exports = router;
























// router.get("/:name", (req, res) => {
//   if (companiesNames.find((element) => element === req.params.name)) {
//     companiesProcessor
//       .getCompanyByName(req.params.name)
//       .then((result) => {
//         res.status(200);
//         res.send(result);
//       })
//       .catch((err) => {
//         res.status(400);
//         res.send(err);
//       });
//   } else {
//     res.send("company name no exist");
//     res.status(400);
//   }
// });
