const { Message } = require("./../models/message");
const { User } = require("./../models/user");

const _ = require("lodash");
const { forEach, forIn } = require("lodash");

const reportMessage = async (req, res) => {
  console.log("req.body:", req.body);
  const message = new Message(
    _.pick(req.body, ["message", "productId", "reportingUserId"])
  );
  //   console.log("message :", message);
  try {
    await message.save();
  } catch (error) {
    console.log("error: ", error);
  }

  const result = {
    status: "success",
    message: "message added successfuly",
  };
  console.log("--------------- result ----------------------");
  console.log(result);

  res.status(200);
  res.send(result);
};

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
  reportMessage,
};
