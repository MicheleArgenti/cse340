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
  let nav = await utilities.getNav()
  const grid = await utilities.buildManagementView()
  res.render("./inventory/management", {
    title: "Management view",
    message: null,
    nav,
    grid
  })
}

module.exports = invCont