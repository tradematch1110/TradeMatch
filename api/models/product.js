const mongoose = require("mongoose");
const Joi = require("joi");
const {coverSchema} = require("./cover");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    expire_time: {
      type: Number,
      required: true,
    },
    service_rating: {
      type: Number,
      required: true,
    },
    cover: {
      type: coverSchema,
      required: true,
    },
  },
  { timestamps: true }
);

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(3).max(30).required(),
    coast: Joi.number().required(),
    expire_time: Joi.number().min(1).max(36).required(),
    service_rating: Joi.number().min(1).max(5).required(),
    // cover: Joi.object().required(), // change to cover id
  };

  return Joi.validate(product, schema);
}


module.exports = {productSchema,
 validateProduct}