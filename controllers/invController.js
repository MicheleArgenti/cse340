const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by details view
 * ************************** */
invCont.buildByDetailsId = async function (req, res, next) {
  const veichle_id = req.params.detailsId
  const data = await invModel.getDetailByVeichleId(veichle_id)
  const grid = await utilities.builDetailDiv(data)
  let nav = await utilities.getNav()
  const name = data[0].inv_make
  res.render("./inventory/details", {
    title: name,
    nav,
    grid,
  })
}

/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  // let grid = await utilities.buildManagementView()
  let nav = await utilities.getNav()
  let classification = await utilities.getClassifications()
  res.render("./inventory/management", {
    title: "Management view",
    message: null,
    nav,
    // grid,
    classification
  })
}

/* ***************************
 *  Build add-classification view
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification View",
    message: null,
    nav
  })
}

/* ***************************
 *  Build add-inventory view
 * ************************** */
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classification = await utilities.getClassifications()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory View",
    message: null,
    nav,
    classification
  })
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

module.exports = invCont