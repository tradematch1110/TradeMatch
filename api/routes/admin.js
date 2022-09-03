const express = require("express");
const adminController = require("../controllers/adminController");
// const validateObjectName = require("../middleware/validateObjectName");

const router = express.Router();
// reportMessage
router.post("/reportMessage", adminController.reportMessage);

// admin/reportMessage
module.exports = router;
