const express = require("express");
const categoriesController = require("../controllers/categoriesController");
// const validateObjectName = require("../middleware/validateObjectName");

const router = express.Router();
// get all companies
router.get("/all", categoriesController.getAllCategories);
router.post("/getCategoriesNames", categoriesController.getAllCategoriesNames);



//get company by name
// router.get("/:name", validateObjectName, companiesController.getCompanyByName);

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
