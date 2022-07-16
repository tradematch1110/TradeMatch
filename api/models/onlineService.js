const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const onlineServiceSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    coverServices: {
      type: Object,
      key: String,
      value: Boolean,
      required: true,
    },

    IsPsychiatryGeriatricsLungsInfectiousIncluded: {
      type: Boolean,
      required: true,
    },
    numOfCoverServices: {
      type: Number,
      required: true,
    },
    waitingForFamilyOrChildrenDoctorInMinutes: {
      type: Number,
      min: 30,
      max: 120,
      required: true,
    },
    waitingForSpecialistDoctorInDays: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    QualifyingPeriodInRoutine: {
      type: Number,
      min: 0,
      max: 90,
      required: true,
    },
    SelfParticipationSpecialistDoctor: {
      type: Number,
      min: 0,
      max: 150,
      required: true,
    },
    SelfParticipationFamilyChildrenDoctor: {
      type: Number,
      min: 0,
      max: 150,
      required: true,
    },
    SelfParticipationCollectOfMedicalInformation: {
      type: Number,
      min: 0,
      max: 150,
      required: true,
    },
    serviceProvaider: {
      type: String,
      required: true,
    },
    dedicatedApp: {
      type: Boolean,
      required: true,
    },
    maxJoiningAge: {
      type: Number,
      min: 0,
      max: 85,
      required: true,
    },
    isStandAloneService: {
      type: Boolean,
      required: true,
    },
    isMedicationOnlineConsulting: {
      type: Boolean,
      required: true,
    },

    isDietitianOnlineAdvice: {
      type: Boolean,
      required: true,
    },
    isMentalOnlineCounseling: {
      type: Boolean,
      required: true,
    },
    prices: {
      type: Object,
      key: Number,
      value: Number,
      required: true,
    },
  },

  { timestamps: true }
);

const OnlineService = mongoose.model("onlineService", onlineServiceSchema);

function validateOnlineService(onlineService) {
  const schema = {
    name: Joi.string().min(3).max(30).required(),
    id: Joi.number().required(),
    // products: Joi.object().required(),  // change to product id
  };

  return Joi.validate(onlineService, schema);
}

module.exports = { OnlineService, validateOnlineService };
