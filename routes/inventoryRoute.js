// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build inventory by detail view
router.get("/detail/:detailsId", invController.buildByDetailsId);
// Route to management view
router.get("/management", invController.buildManagementView);

module.exports = router;