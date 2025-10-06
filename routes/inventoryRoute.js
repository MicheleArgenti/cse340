// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
const managementController = require("../controllers/managementController")
const managementValidate = require('../utilities/management-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build inventory by detail view
router.get("/detail/:detailsId", invController.buildByDetailsId);
// Route to management view
router.get("/management", invController.buildManagementView);
// Route to add-classification view
router.get("/add-classification", invController.buildAddClassificationView);
// Route to add a new classification in the DB
router.post(
    "/add-classification",
    managementValidate.addClassificationRules(),
    managementValidate.checkAddClassification,
    utilities.handleErrors(managementController.addController)
);
// Route to add-invetory view
router.get("/add-inventory", invController.buildAddInventoryView);
// Route to add a new inventory in the DB
router.post(
    "/add-inventory",
    managementValidate.addInventoryRules(),
    managementValidate.checkAddInventory,
    utilities.handleErrors(managementController.addInventory)
);

module.exports = router;