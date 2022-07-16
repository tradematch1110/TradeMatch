/**********************************************************************************************
                ******* this file handle mongoDb queries for doctors online service*******
1. contains functions for doctors online service and export them
***********************************************************************************************/

const { OnlineService } = require("../models/onlineService");

const getCompaniesByMaxJoiningAge = async (age) => {
  const companies = await OnlineService.find({ maxJoiningAge: { $gte: age } });
  return companies;
};
const getAllCompanies = async (age) => {
  const companies = await OnlineService.find();
  return companies;
};
const isStandAloneService = async () => {
  const companies = await OnlineService.find({
    isStandAloneService: true,
  });
  return companies;
};
const getCompanyByName = async (companyName) => {
  const companies = await OnlineService.findOne({
    companyName: `${companyName}`,
  });
  return companies;
};

module.exports = {
  getCompaniesByMaxJoiningAge,
  getAllCompanies,
  isStandAloneService,
  getCompanyByName,
};
