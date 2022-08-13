const { User } = require("./../models/user");

const _ = require("lodash");

const getUserMassages = async (req, res) => {
  const user = await User.findOne({ _id: req.body.uid}, );
  
  res.status(200);
  res.send(user.massages);
};

module.exports = {
  getUserMassages,
};
