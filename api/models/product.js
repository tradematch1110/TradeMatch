const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    produectTitle: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
    },
    replaceableCategoryNo1: {
      type: String,
      required: true,
    },
    replaceableSubCategoryNo1: {
      type: String,
      required: true,
    },
    replaceableCategoryNo2: {
      type: String,
    },
    replaceableSubCategoryNo2: {
      type: String,
    },
    replaceableCategoryNo3: {
      type: String,
    },
    replaceableSubCategoryNo3: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = {
    produectTitle: Joi.string().min(3).max(30).required(),
    descriptions: Joi.string().min(3).max(150).required(),
    condition: Joi.string().min(3).max(50).required(),
    category: Joi.string().min(3).max(50).required(),
    subCategory: Joi.string().min(3).max(50).required(),
    images: Joi.array(),
    replaceableCategoryNo1: Joi.string().min(3).max(50).required(),
    replaceableSubCategoryNo1: Joi.string().min(3).max(50).required(),
    replaceableCategoryNo2: Joi.string().min(3).max(50),
    replaceableSubCategoryNo2: Joi.string().min(3).max(50),
    replaceableCategoryNo3: Joi.string().min(3).max(50),
    replaceableSubCategoryNo3: Joi.string().min(3).max(50),
    date: Joi.date().required(),
    user: Joi.object().required()
    //
  };

  return Joi.validate(product, schema);
}

module.exports = { Product, validateProduct };
