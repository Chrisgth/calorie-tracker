const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema(
  {
    userID: {
      type: String,
      required: [true, "A plan must have a user creating it"],
    },
    title: {
      type: String,
      required: [true, "A plan must have a title"],
    },
    description: {
      type: String,
    },
    plan: {
      breakfast: {
        type: Object,
      },
      lunch: {
        type: Object,
      },
      dinner: {
        type: Object,
      },
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model("plan", planSchema);

module.exports = Plan;
