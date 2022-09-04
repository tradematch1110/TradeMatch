const { User } = require("./../models/user");

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
  console.log("addFavoriteProductToUser:",  req.body)
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
}
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

module.exports = {
  getUserMessages,
  addFavoriteProductToUser,
  getUserFavouritesProducts,
  getUserById,
};
