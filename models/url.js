const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bitSchema = new Schema({
  long: String,
  short: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("bit", bitSchema);
