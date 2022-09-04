/**********************************************************************************************
                ******* this file handle doctors users routes  *******

  1. use express
  2. use logger 
  3. use route from express 
  4. use [getAllOnlineService, getOnlineServiceByName, getPriceOffer] functions 
     as middlewares form onlineServiceController

***********************************************************************************************/
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const { Login, validateLogin } = require("../models/login");
const { generateToken } = require("../models/token");
const userController = require("../controllers/userController");

const mongoose = require("mongoose");
const express = require("express");
// const logger = require("../startup/logger");
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);

  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({
      status: "error",
      message: "User already registered.",
    });

  user = new User(
    _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "password",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  // res.setHeader("Set-Cookie", "newUser=true");
  res.status(200).send(
    {
      status: "success",
      message: "User registered successfuly",
    }
    // _.pick(user, ["_id", "firstName", "lastName", "email", "phoneNumber"])
  );
});

router.post("/login", async (req, res) => {
  console.log(req.body);

  const { error } = validateLogin(req.body);
  console.log("error: ", error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  // console.log("user: ", user);

  if (!user)
    return res.status(400).send({
      status: "error",
      message: "User not exist.",
    });

  if (user) {
    // console.log("user:", user)
    const auth = await bcrypt.compare(req.body.password, user.password);
    if (auth) {
      // const salt = await bcrypt.genSalt(10);
      // const uid = await bcrypt.hash(user._id.toString(), salt);
      console.log("id: ", user._id.toString());
      const accessToken = generateToken(req.body);
      console.log("accessToken", accessToken);
      res.setHeader("Set-Cookie", accessToken);
      res.status(200);
      res.send(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          uid: user._id.toString(),
          message: "User login successfuly",
          messages: user.messages,
          favouritesProducts: user.favouritesProducts,
          accessToken: accessToken,
        }
        // _.pick(user, ["_id", "firstName", "lastName", "email", "phoneNumber"])
      );
    } else {
      return res.status(400).send({
        status: "error",
        message: "Incorrect password.",
      });
    }
  }
});

// router.post("/get_user_by_id", async (req, res) => {
//   console.log(req.body);

//   const uid = await bcrypt.hashSync(req.body._id, salt);

//   let user = await User.findById({ _id: req.body._id });
//   // console.log("user: ", user);

//   if (!user)
//     return res.status(400).send({
//       status: "error",
//       message: "User not exist.",
//     });

//   if (user) {
//     // console.log("user:", user)

//     res.status(200);
//     res.send(
//       {
//         status: "success",
//         user: user,
//       }
//       // _.pick(user, ["_id", "firstName", "lastName", "email", "phoneNumber"])
//     );
//   } else {
//     return res.status(400).send({
//       status: "error",
//       message: "Incorrect password.",
//     });
//   }
// });

router.post("/getUserMessages", userController.getUserMessages);
router.post("/addFavoriteProductToUser", userController.addFavoriteProductToUser);
router.post("/get_user_by_id", userController.getUserById);
router.post(
  "/getUserFavouritesProducts",
  userController.getUserFavouritesProducts
);

// getUserFavouritesProducts

module.exports = router;
