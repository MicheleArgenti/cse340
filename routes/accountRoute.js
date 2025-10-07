// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to build path to login page
router.get("/login", utilities.handleErrors(accountController.buildLogin));
// Route to build path to register page
router.get("/register", utilities.handleErrors(accountController.buildRegister));
// Route to craete an account
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
);
// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLogdata,
    utilities.handleErrors(accountController.accountLogin)
)
// Default route
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccount))

module.exports = router;