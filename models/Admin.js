const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  image: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: true,
  },
});
AdminSchema.set("timestamps", true);

// Login
AdminSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("admins", AdminSchema); //users: ten collection trong DB
