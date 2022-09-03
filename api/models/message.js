// const config = require("config");
// const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const Message = mongoose.model(
  "Message",
  new mongoose.Schema({
    message: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    productId: {
      type: String,
      required: true,
    },
    reportingUserId: {
      type: String,
      required: true,
    },
  })
);

// userSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign(
//     {
//       _id: this._id,
//       name: this.name,
//       email: this.email,
//       isAdmin: this.isAdmin
//     },
//     config.get("jwtPrivateKey")
//   );
//   return token;
// };

// const User = mongoose.model("User", userSchema);

function validateMessage(message) {
  const schema = Joi.object({
    message: Joi.string().min(10).max(500).required(),
    productId: Joi.string().required(),
    reportingUserId: Joi.string().required(),
  });

  return schema.validate(message);
}

exports.Message = Message;
exports.validate = validateMessage;
// module.exports = { User, validateUser };
