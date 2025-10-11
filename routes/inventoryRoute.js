// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
const managementController = require("../controllers/managementController")
const managementValidate = require('../utilities/management-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
// Route to build inventory by detail view
router.get("/detail/:detailsId", utilities.handleErrors(invController.buildByDetailsId));
// Route to management view
router.get("/management", utilities.checkPermission, utilities.handleErrors(invController.buildManagementView));
// Route to add-classification view
router.get("/add-classification", utilities.checkPermission, utilities.handleErrors(invController.buildAddClassificationView));
// Route to add a new classification in the DB
router.post(
    "/add-classification",
    managementValidate.addClassificationRules(),
    managementValidate.checkAddClassification,
    utilities.handleErrors(managementController.addController)
);
// Route to add-invetory view
router.get("/add-inventory", utilities.checkPermission, invController.buildAddInventoryView);
// Route to add a new inventory in the DB
router.post(
    "/add-inventory",
    managementValidate.addInventoryRules(),
    managementValidate.checkAddInventory,
    utilities.handleErrors(managementController.addInventory)
);
// Route to get inventory based on classification id
router.get("/getInventory/:classification_id", utilities.checkPermission, utilities.handleErrors(invController.getInventoryJSON));
// Route to edit an inventory
router.get("/edit/:inv_id", utilities.checkPermission, utilities.handleErrors(invController.editInventoryView));
// Route to update an inventory
router.post("/update/", utilities.handleErrors(invController.updateInventory));
// Route to delete an inventory
router.get("/delete/:inv_id", utilities.checkPermission, utilities.handleErrors(invController.deleteInventoryView))
// Route to confirm the delete of the inventory
router.post("/confirm-delete/", utilities.handleErrors(invController.confirmDeleteInventory))

module.exports = router;