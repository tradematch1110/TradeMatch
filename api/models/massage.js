// const config = require("config");
// const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const Massage = mongoose.model(
  "Massage",
  new mongoose.Schema({
    massage: {
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

function validateMassage(massage) {
  const schema = Joi.object({
    massage: Joi.string().min(10).max(500).required(),
    productId: Joi.string().required(),
    reportingUserId: Joi.string().required(),
  });

  return schema.validate(massage);
}

exports.Massage = Massage;
exports.validate = validateMassage;
// module.exports = { User, validateUser };
