const { User } = require("./../models/user");

const _ = require("lodash");

const getUserMessages = async (req, res) => {
  const user = await User.findOne({ _id: req.body.uid });

  res.status(200);
  res.send(user.messages);
};

module.exports = {
  getUserMessages,
};
