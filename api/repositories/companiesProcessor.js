const companiesController = require("../controllers/companiesController");
const companiesNames = ["megdal", "menora"];


const getAllCompanies = async (req, res, next) => {
  if (req) {
    next(); //todo
  } else {
    res.send(""); //to do
  }
};

const getCompanyByName = async (req, res, next) => {
  // throw new Error("Error in companyies proceessor");
  // winston.info("in companies controlles " + req.params.name);
  if (companiesNames.find((element) => element === req.params.name)){
    next();
  }
  else{
    res.send("comapny name not exist");
  }
  
};

module.exports = {
  getAllCompanies,
  getCompanyByName,
};
