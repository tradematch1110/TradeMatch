const { Product } = require("./../models/product");
const { User } = require("./../models/user");

const _ = require("lodash");
const { forEach, forIn } = require("lodash");

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  var result = [];
  products.forEach((product) => {
    let temp = { ...product }._doc;
    // delete temp._id;
    // delete temp.id;
    // delete temp.createdAt;
    // delete temp.updatedAt;
    delete temp.user.message;
    delete temp.user.messages;
    delete temp.user.accessToken;
    delete temp.__v;
    result.push(temp);
  });

  res.status(200);
  res.send(result);
};

const getProductsPerUser = async (req, res) => {
  if (!req.body.uid) {
    return res.status(400).send({
      status: "error",
      message: "Bad request.",
    });
  }
  let products;

  if (req.body.uid) {
    // {_id: 'nAwt3b76c24mZfqxz', test:{ $elemMatch: { "30": {$exists: true}}}},
    products = await Product.find({ "user.uid": req.body.uid });
  }

  if (!products) {
    return res.status(200).send({
      status: "Not found",
      message: "No Products for this user.",
    });
  }
  var result = [];
  products.forEach((product) => {
    let temp = { ...product }._doc;
    // delete temp._id;
    // delete temp.id;
    // delete temp.createdAt;
    // delete temp.updatedAt;
    // delete temp.user.message;
    // delete temp.user.messages;
    delete temp.user.accessToken;
    delete temp.__v;
    result.push(temp);
  });

  res.status(200);
  res.send(result);
};

const getFavouritesProductsPerUser = async (req, res) => {
  console.log("req.body.favouritesProducts: ", req.body.favouritesProducts);
  if (!req.body.favouritesProducts) {
    return res.status(400).send({
      status: "error",
      message: "Bad request.",
    });
  }
  let products =  [];

  for (const id in req.body.favouritesProducts) {
    console.log("id in loop: ", req.body.favouritesProducts[id]);
    let res = await Product.find({ _id: `${req.body.favouritesProducts[id]}` });
    console.log("res in loop: ", res);
    if(res){
    products.push(res[0]);}
    res=null;
  }
  console.log("products: ", products);

  // req.body.favouritesProducts.forEach(productId =>  {
  //     let product =  await Product.find({ _id: `${productId}` });
  //     products.push(product)
  //   });

  if (!products) {
    return res.status(200).send({
      status: "Not found",
      message: "No favouritesProducts for this user.",
    });
  }
  var result = [];
  products.forEach((product) => {
    let temp = { ...product }._doc;
    // delete temp._id;
    // delete temp.id;
    // delete temp.createdAt;
    // delete temp.updatedAt;
    // delete temp.user.message;
    delete temp.user.messages;
    delete temp.user.accessToken;
    delete temp.__v;
    result.push(temp);
  });
    console.log("result: ", result);

  res.status(200);
  res.send(result);
};

const getProductsByCategoryAndSubCategory = async (req, res) => {
  const category = req.body.category;
  const subCategory = req.body.subCategory;
  if (!category) {
    return res.status(400).send({
      status: "error",
      message: "Bad request.",
    });
  }
  let products;
  if (category && !subCategory) {
    products = await Product.find({ category: category });
  }
  if (category && subCategory) {
    products = await Product.find({
      $and: [{ category: category }, { subCategory: subCategory }],
    });
  }

  if (!products) {
    return res.status(204).send({
      status: "Not found",
      message: "No Product exist in this category.",
    });
  }
  var result = [];
  products.forEach((product) => {
    let temp = { ...product }._doc;
    // delete temp._id;
    // delete temp.id;
    // delete temp.createdAt;
    // delete temp.updatedAt;
    delete temp.user.message;
    delete temp.user.messages;
    delete temp.user.accessToken;
    delete temp.__v;
    result.push(temp);
  });

  res.status(200);
  res.send(result);
};

const getProductById = async (req, res) => {
  // winston.error("in Categories controlles " + req.params.name);
  // throw new Error("Error in companyies controller");

  const product = await Product.findOne({ _id: `${req.body._id}` });
  if (!product) {
    return res.status(400).send({
      status: "error",
      message: "Product not exist.",
    });
  }
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

const updateProduct = async (req, res) => {
  const product = await Product.updateOne(
    { _id: `${req.body._id}` },
    {
      $set: {
        produectTitle: `${req.body.produectTitle}`,
        descriptions: `${req.body.descriptions}`,
        condition: `${req.body.condition}`,
        category: `${req.body.category}`,
        subCategory: `${req.body.subCategory}`,
        images: req.body.images,
        replaceableCategoryNo1: `${req.body.replaceableCategoryNo1}`,
        replaceableSubCategoryNo1: `${req.body.replaceableSubCategoryNo1}`,
        replaceableCategoryNo2: `${req.body.replaceableCategoryNo2}`,
        replaceableSubCategoryNo2: `${req.body.replaceableSubCategoryNo2}`,
        replaceableCategoryNo3: `${req.body.replaceableCategoryNo3}`,
        replaceableSubCategoryNo3: `${req.body.replaceableSubCategoryNo3}`,
        // dateUpdate: `${req.body.date}`,
      },
    }
  );
  if (!product) {
    return res.status(400).send({
      status: "error",
      message: "Product not exist.",
    });
  }
  let matchResult = await isMatchProduct(product);
  console.log("matchResult: ", matchResult);

  //   console.log("product :", product);
  // try {
  //   await product.u();
  // } catch (error) {
  //   console.log("error: ", error);
  // }

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
      if (product.user.uid !== currentProductKey.user.uid) {
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
            product.subCategory ===
              currentProductKey.replaceableSubCategoryNo1 ||
            product.subCategory ===
              currentProductKey.replaceableSubCategoryNo2 ||
            product.subCategory === currentProductKey.replaceableSubCategoryNo3
          ) {
            console.log("----------- full match ------------------");

            fullMatchProducts.push(currentProductKey);
            const resMessage1 = await setUserMessage(
              currentProductKey.user.uid,
              product,
              "נמצאה התאמה מלאה עבורך"
            );
          } else {
            console.log("------------ part match -----------------");
            partMatchProducts.push(currentProductKey);
            const resMessage2 = await setUserMessage(
              currentProductKey.user.uid,
              product,
              "נמצאה התאמה חלקית עבורך"
            );
          }
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

async function setUserMessage(uid, product, message) {
  const message1 = {
    product: product,
    message: message,
    date: new Date(),
    isread: false,
  };
  const filter = { _id: uid };
  //{ $push: { friends: objFriends  } }
  const update = { $push: { messages: message1 } };

  let doc = await User.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log("--------------- setUserMessage update ----------------------");
  console.log("doc: ", doc);

  // console.log("update :", update);
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductsPerUser,
  getFavouritesProductsPerUser,
  getProductsByCategoryAndSubCategory,
  createProduct,
  updateProduct,
  
};
