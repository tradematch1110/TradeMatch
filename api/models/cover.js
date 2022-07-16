const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const coverSchema = new Schema(
  {
    cover_type: {
      type: String,
      required: true,
    },
    amount_of_meeting: {
      type: Number,
      required: true,
    },
    deductible: {
      type: Number,
      required: true,
    },
    first_meeting_frontal: {
      type: Boolean,
      required: true,
    },
    ways_to_contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

function validateCover(cover) {
  const schema = {
    cover_type: Joi.string().min(3).max(30).required(),
    amount_of_meeting: Joi.number().required(),
    deductible: Joi.number().min(1).max(5).required(),
    first_meeting_frontal: Joi.boolean().required(),
    ways_to_contact: Joi.string().email(),
  };

  return Joi.validate(cover, schema);
}


module.exports = {coverSchema, validateCover}