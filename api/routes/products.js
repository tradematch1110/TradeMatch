const express = require("express");
const productsController = require("../controllers/productsController");
// const validateObjectName = require("../middleware/validateObjectName");

const router = express.Router();
// get all companies
router.post("/getAllProducts", productsController.getAllProducts);
router.post("/createProduct", productsController.createProduct);
router.post("/updateProduct", productsController.updateProduct);
router.post("/getProductById", productsController.getProductById);
router.post(
  "/getProductsByCategoryAndSubCategory",
  productsController.getProductsByCategoryAndSubCategory
);
router.post("/getProductsPerUser", productsController.getProductsPerUser);
router.post(
  "/getFavouritesProductsPerUser",
  productsController.getFavouritesProductsPerUser
);
router.post("/deleteProduct", productsController.deleteProduct);
router.post("/getProductsByList", productsController.getProductsByList);
//   deleteUserMessages,

module.exports = router;

