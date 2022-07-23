const { Category } = require("./../models/category");

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  var result = [];
  categories.forEach((category) => {
    let temp = { ...category }._doc;
    delete temp._id;
    delete temp.id;
    delete temp.createdAt;
    delete temp.updatedAt;
    delete temp.__v;
    result.push(temp);
  });

  res.status(200);
  res.send(result);
};

const getAllCategoriesNames = async (req, res) => {
  const categories = await Category.find();
    let categoriesNames = [];
    categories.forEach((category) => {
      categoriesNames.push(category.name);
    });
  const finalResult = { categoriesNames: categoriesNames, status: "success" };
  res.status(200);
  res.send(finalResult);
};

const getCategoryByName = async (req, res) => {
  // winston.error("in Categories controlles " + req.params.name);

  // throw new Error("Error in companyies controller");

  const category = await Category.findOne({ name: `${req.params.name}` });
  res.send(category);
};

module.exports = {
  getAllCategories,
  getCategoryByName,
  getAllCategoriesNames,
};
