const express = require("express");
// const {
//   getAllOnlineService,
//   getOnlineServiceByName,
// } = require("../controllers/onlineServiceController");
// const validateObjectName = require("../middleware/validateObjectName");

const router = express.Router();
// get all companies
// router.get("/all", getAllOnlineService);
//get company by name
// router.get("/:name", getOnlineServiceByName);

router.post("/priceoffer", (req, res) => {
  console.log("li price offer request accepted");
  res.json({ price: 76 });
  res.status(200);
});
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
