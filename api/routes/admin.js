const express = require("express");
const adminController = require("../controllers/adminController");
// const validateObjectName = require("../middleware/validateObjectName");

const router = express.Router();
// reportMassage
router.post("/reportMassage", adminController.reportMassage);

// admin/reportMassage
module.exports = router;


