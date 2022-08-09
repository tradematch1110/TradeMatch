const { Product } = require("./../models/product");
const _ = require("lodash");
const { forEach, forIn } = require("lodash");

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
  let matchProductsresult = await isMatchProduct(product);
  console.log("matchProductsresult: ", matchProductsresult);

  //   console.log("product :", product);
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

async function isMatchProduct(product) {
  const products = await Product.find({
    $or: [
      {
        $and: [
          { category: product.replaceableCategoryNo1 },
          { subCategory: product.replaceableSubCategoryNo1 },
        ],
      },
      {
        $and: [
          { category: product.replaceableCategoryNo2 },
          { subCategory: product.replaceableSubCategoryNo2 },
        ],
      },
      {
        $and: [
          { category: product.replaceableCategoryNo3 },
          { subCategory: product.replaceableSubCategoryNo3 },
        ],
      },
    ],
  });
  let matchProducts = [];

  for (const key in products) {
    if (Object.hasOwnProperty.call(products, key)) {
      const e = products[key];

      console.log(e.category, " ", e.subCategory);
      console.log("--------------------------------------");
      if (
        product.category ===
        (e.replaceableCategoryNo1 ||
          e.replaceableCategoryNo2 ||
          e.replaceableCategoryNo3)
      ) {
        if (
          product.subCategory ===
          (e.replaceableSubCategoryNo1 ||
            e.replaceableSubCategoryNo2 ||
            e.replaceableSubCategoryNo3)
        ) {
          matchProducts.push(e);
        }
      }
    }
  }

  // currentProduct.replaceableCategoryNo1
  //   console.log(
  //     "-----------------------------------------------------------------------------------"
  //   );
  // category
  // subCategory
  // replaceableCategoryNo1
  // replaceableSubCategoryNo1
  // replaceableCategoryNo2
  // replaceableSubCategoryNo2
  // replaceableCategoryNo3
  // replaceableSubCategoryNo3

  //   for (const key in products) {
  //     if (Object.hasOwnProperty.call(products, key)) {
  //       const element = products[key];
  //       console.log(element._id);
  //     }
  //   }
  //   console.log(
  //     "-----------------------------------------------------------------------------------"
  //   );
  return matchProducts;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  isMatchProduct,
};
