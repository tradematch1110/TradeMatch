const mongoose = require("mongoose");
const Joi = require("joi");
const { productSchema } = require("./product");
const Schema = mongoose.Schema;

const companySchema = new Schema(
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
    products: [
      {
        type: productSchema,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Company = mongoose.model('Company', companySchema);


function validateCompany(company) {
  const schema = {
    name: Joi.string().min(3).max(30).required(),
    id: Joi.number().required(),
    // products: Joi.object().required(),  // change to product id
  };

  return Joi.validate(company, schema);
}

module.exports = {Company, validateCompany};
