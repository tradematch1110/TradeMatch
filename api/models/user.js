// const config = require("config");
// const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    password: {
      
    },
    massages: [

    ],
    isAdmin: {
      type: Boolean
    }
    // isAdmin: Boolean
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

function validateUser(user) {

  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(20)
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(20)
      .required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
      .required(),
    password: Joi.string()
      .required()
      .min(8)
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
// module.exports = { User, validateUser };
