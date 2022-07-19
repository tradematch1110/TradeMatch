const categoriesController = require("../controllers/categoriesController");

const getAllCategories = async (req, res, next) => {
  if (req) {
    next(); //todo
  } else {
    res.send(""); //to do
  }
};

const getAllCategoriesNames = async (req, res, next) => {
  if (req) {
    next(); //todo
  } else {
    res.send(""); //to do
  }
};




// const getCategoryByName = async (req, res, next) => {
//   // throw new Error("Error in companyies proceessor");
//   // winston.info("in companies controlles " + req.params.name);
//   if (companiesNames.find((element) => element === req.params.name)) {
//     next();
//   } else {
//     res.send("category name not exist");
//   }
// };

module.exports = {
  getAllCategories,
  getAllCategoriesNames,
  //   getCategoryByName,
};
