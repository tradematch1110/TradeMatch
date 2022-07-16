const mongoose = require("mongoose");
const {Company} = require("../models/company");

async function getCompanies() {
  try {
    const quere = await Company.find({}).select({ name: 1, _id: 0 });
    const companies = quere.map((element) => element.name);
    return companies;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
module.exports =async function (req, res, next) {
  // if (!mongoose.Types.ObjectIName.isValid(req.params.id))
  //   return res.status(404).send("Invalid ID.");
const companies = await getCompanies();
console.log(companies);

if (!companies.find((name) => name === req.params.name)) {
 return res.status(404).send("Invalid Name.");
}
  next();
};
