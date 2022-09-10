const { User } = require("./../models/user");
const { Product } = require("../models/product");

const _ = require("lodash");

const getUserMessages = async (req, res) => {
  const user = await User.findOne({ _id: req.body.uid });

  res.status(200);
  res.send(user.messages);
};

const getUserFavouritesProducts = async (req, res) => {
  const user = await User.findOne({ _id: req.body.uid });

  res.status(200);
  res.send(user.favouritesProducts);
};

const addFavoriteProductToUser = async (req, res) => {
  console.log("addFavoriteProductToUser:", req.body);
  const productId = req.body.productId;
  const userId = req.body.userId;

  if (!productId || !userId) {
    return res.status(400).send({
      status: "error",
      message: "Bad request",
    });
  }

  const filter = { _id: userId };
  //{ $push: { friends: objFriends  } }
  const update = { $push: { favouritesProducts: productId } };

  let user = await User.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log(
    "--------------- setUserFavouritesProducts update ----------------------"
  );
  console.log("user: ", user);
  res.status(200);
  res.send(user);
};

const removeFavoriteProductFromUser = async (req, res) => {
  console.log("removeFavoriteProductFromUser:", req.body);
  const productId = req.body.productId;
  const userId = req.body.userId;

  if (!productId || !userId) {
    return res.status(400).send({
      status: "error",
      message: "Bad request",
    });
  }

  const filter = { _id: userId };
  //{ $push: { friends: objFriends  } }
  const update = { $pull: { favouritesProducts: productId } };

  let user = await User.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log(
    "--------------- removeFavoriteProductFromUser update ----------------------"
  );
  console.log("user: ", user);
  res.status(200);
  res.send(user);
};

const getUserById = async (req, res) => {
  console.log(req.body);

  const uid = await bcrypt.hashSync(req.body._id, salt);

  let user = await User.findById({ _id: req.body._id });
  // console.log("user: ", user);

  if (!user)
    return res.status(400).send({
      status: "error",
      message: "User not exist.",
    });

  if (user) {
    // console.log("user:", user)

    res.status(200);
    res.send(
      {
        status: "success",
        user: user,
      }
      // _.pick(user, ["_id", "firstName", "lastName", "email", "phoneNumber"])
    );
  } else {
    return res.status(400).send({
      status: "error",
      message: "Incorrect password.",
    });
  }
};

const editUser = async (req, res) => {
  console.log(req.body);
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.phoneNumber ||
    !req.body._id
  ) {
    return res.status(400).send({
      status: "error",
      message: "Bad request.",
    });
  }
  const user = await User.updateOne(
    { _id: `${req.body._id}` },
    {
      $set: {
        firstName: `${req.body.firstName}`,
        lastName: `${req.body.lastName}`,
        phoneNumber: `${req.body.phoneNumber}`,
      },
    }
  );

  console.log("user: ", user);
  if (!user) {
    return res.status(400).send({
      status: "error",
      message: "User not exist.",
    });
  }

  const userUpdated = await User.findById({ _id: `${req.body._id}` });
  if (!userUpdated) {
    return res.status(400).send({
      status: "error",
      message: "Somthing wrong",
    });
  }
  res.status(200);

  console.log("---------------------------------------");
  console.log(userUpdated.firstName);

  res.send(
    {
      firstName: userUpdated.firstName,
      lastName: userUpdated.lastName,
      email: userUpdated.email,
      phoneNumber: userUpdated.phoneNumber,
      uid: userUpdated._id.toString(),
      message: "userUpdated login successfuly",
      messages: userUpdated.messages,
      favouritesProducts: userUpdated.favouritesProducts,
    }
    // _.pick(user, ["_id", "firstName", "lastName", "email", "phoneNumber"])
  );
};

const deleteUser = async (req, res) => {
  console.log(req.body);
  if (!req.body._id) {
    return res.status(400).send({
      status: "error",
      message: "Bad request.",
    });
  }
  const user = await User.deleteOne({ _id: `${req.body._id}` });
  let remove;
  
  if(user){
  remove = await Product.deleteMany({ "user.uid": `${req.body._id}` });
  }
  console.log("user: ", user);
  if (!user) {
    return res.status(400).send({
      status: "error",
      message: "User not exist.",
    });
  }
  res.status(200);
  res.send({ message: "המשתמש הוסר בהצלחה!" });
};

module.exports = {
  getUserMessages,
  addFavoriteProductToUser,
  getUserFavouritesProducts,
  removeFavoriteProductFromUser,
  getUserById,
  editUser,
  deleteUser,
};
