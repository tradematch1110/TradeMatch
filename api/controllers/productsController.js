const { Product } = require("./../models/product");
const { User } = require("./../models/user");

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
  let matchResult = await isMatchProduct(product);
  console.log("matchResult: ", matchResult);

  //   console.log("product :", product);
  try {
    await product.save();
  } catch (error) {
    console.log("error: ", error);
  }

  // res.setHeader("Set-Cookie", "newUser=true");
  const result = {
    status: "success",
    message: "product created successfuly",
    matchResult: matchResult,
  };
  console.log("--------------- result ----------------------");
  console.log(result);

  res.status(200);
  res.send(result);
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
  let fullMatchProducts = [];
  let partMatchProducts = [];

  for (const key in products) {
    if (Object.hasOwnProperty.call(products, key)) {
      const currentProductKey = products[key];
      console.log("--------- match product from db  --------");

      console.log(
        currentProductKey.category,
        " ",
        currentProductKey.subCategory
      );
      if (
        product.category === currentProductKey.replaceableCategoryNo1 ||
        product.category === currentProductKey.replaceableCategoryNo2 ||
        product.category === currentProductKey.replaceableCategoryNo3
      ) {
        if (
          product.subCategory === currentProductKey.replaceableSubCategoryNo1 ||
          product.subCategory === currentProductKey.replaceableSubCategoryNo2 ||
          product.subCategory === currentProductKey.replaceableSubCategoryNo3
        ) {
          console.log("----------- full match ------------------");

          fullMatchProducts.push(currentProductKey);
          const resMassage1 = await setUserMassage(
            currentProductKey.user.uid,
            product,
            "נמצאה התאמה מלאה עבורך"
          );
        } else {
          console.log("------------ part match -----------------");
          partMatchProducts.push(currentProductKey);
          const resMassage2 = await setUserMassage(
            currentProductKey.user.uid,
            product,
            "נמצאה התאמה חלקית עבורך"
          );


        }
      }
    }
  }

  //   }
  console.log("--------------- after filter ----------------------");
  console.log("fullMatchProducts: ", fullMatchProducts);
  console.log("partMatchProducts: ", partMatchProducts);

  return {
    fullMatchProducts: fullMatchProducts,
    partMatchProducts: partMatchProducts,
  };
}

async function setUserMassage(uid, product, massage) {
  const massage1 = {
    product: product,
    massage: massage,
    date: new Date(),
    isread: false
  };
  const filter = { _id: uid };
  //{ $push: { friends: objFriends  } }
  const update = { $push: { massages: massage1 }};

  let doc = await User.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log("--------------- setUserMassage update ----------------------");
  console.log("doc: ", doc);

  // console.log("update :", update);
}
 
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  isMatchProduct,
};
