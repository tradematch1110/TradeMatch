const { Product } = require("./../models/product");
const _ = require("lodash");

const getAllProducts = async (req, res) => {
    
  const products = await Product.find();
  var result = [];
  products.forEach((product) => {
    let temp = { ...product }._doc;
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

const getProductById = async (req, res) => {
  // winston.error("in Categories controlles " + req.params.name);

  // throw new Error("Error in companyies controller");

  const product = await Product.findOne({ _id: `${req.params._id}` });
  res.send(product);
};

const createProduct = async (req, res) => {
  console.log("req.body:", req.body);
  const product = new Product(
    _.pick(req.body, [
      "produectTitle",
      "descriptions",
      "condition",
      "category",
      "subCategory",
      "images",
      "replaceableCategoryNo1",
      "replaceableSubCategoryNo1",
      "replaceableCategoryNo2",
      "replaceableSubCategoryNo2",
      "replaceableCategoryNo3",
      "replaceableSubCategoryNo3",
      "date",
      "user",
    ])
  );
  console.log("product :", product);
try {
      await product.save();

} catch (error) {
    console.log("error: ", error);
}
  

  // res.setHeader("Set-Cookie", "newUser=true");
  res.status(200).send({
    status: "success",
    message: "product created successfuly",
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
