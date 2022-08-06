const express = require("express");
const productsController = require("../controllers/productsController");
// const validateObjectName = require("../middleware/validateObjectName");

const router = express.Router();
// get all companies
router.post("/getAllProducts", productsController.getAllProducts);
router.post("/createProduct", productsController.createProduct);


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
