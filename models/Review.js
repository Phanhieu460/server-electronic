const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});

ReviewSchema.set("timestamps", true);
module.exports = mongoose.model("reviews", ReviewSchema);
