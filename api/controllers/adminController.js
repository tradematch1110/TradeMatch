const { Massage } = require("./../models/massage");
const { User } = require("./../models/user");

const _ = require("lodash");
const { forEach, forIn } = require("lodash");

const reportMassage = async (req, res) => {
  console.log("req.body:", req.body);
  const massage = new Massage(
    _.pick(req.body, ["massage", "productId", "reportingUserId"])
  );
  //   console.log("massage :", massage);
  try {
    await massage.save();
  } catch (error) {
    console.log("error: ", error);
  }

  const result = {
    status: "success",
    message: "massage added successfuly",
  };
  console.log("--------------- result ----------------------");
  console.log(result);

  res.status(200);
  res.send(result);
};



async function setUserMassage(uid, product, massage) {
  const massage1 = {
    product: product,
    massage: massage,
    date: new Date(),
    isread: false,
  };
  const filter = { _id: uid };
  //{ $push: { friends: objFriends  } }
  const update = { $push: { massages: massage1 } };

  let doc = await User.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log("--------------- setUserMassage update ----------------------");
  console.log("doc: ", doc);

  // console.log("update :", update);
}

module.exports = {
  reportMassage
};
