const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;


const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    subCategories: {
        type: Array,
        required: true,
        unique: true,
        
    }
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = {
    name: Joi.string().min(2).max(30).required(),
    id: Joi.number().required(),
    subCategories: Joi.array().required(),
    // products: Joi.object().required(),  // change to product id
  };

  return Joi.validate(category, schema);
}

module.exports = { Category, validateCategory };
