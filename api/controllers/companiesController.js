const { Company } = require("./../models/company");

const getAllCompanies = async (req, res) => {
  const companies = await Company.find();
  res.status(200);
  res.send(companies);
};

const getCompanyByName = async (req, res) => {
  // winston.error("in companies controlles " + req.params.name);

  // throw new Error("Error in companyies controller");

  const company = await Company.findOne({ name: `${req.params.name}` });
  res.send(company);
};

module.exports = {
  getAllCompanies,
  getCompanyByName,
};
