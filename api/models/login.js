// const config = require("config");
// const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const Login = mongoose.model(
  "Login",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
    },
    // isAdmin: Boolean
  })
);


function loginValidate(login) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  });
  return schema.validate(login);
}
exports.Login = Login;
exports.validateLogin = loginValidate;
// module.exports = { User, validateUser };
