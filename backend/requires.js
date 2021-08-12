const mongoose = require("mongoose");

const requireSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
  },
  phone: {
    type: Number,
    required: [true, "Phone Number should be provided"],
  },
  gender: {
    type: String,
    required: [true, "Gender must be provided"],
  },
  proof: {
    type: String,
    required: [true, "Proof should be provided"],
  },
  card: {
    type: Number,
    required: [true, "Proof Card Number should be provided"],
  },
  date: {
    type: Date,
    required: [true, "Requirement Date must be provided"],
  },
  require: {
    type: String,
    required: [true, "Requirements must be provided"],
  },
});

const Require = mongoose.model("requirecontents", requireSchema);

module.exports = Require;
