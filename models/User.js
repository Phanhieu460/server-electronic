const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://media.wired.com/photos/59264baf7034dc5f91beaf03/master/w_2560%2Cc_limit/DroneTA_GettyImages-599365398.jpg",
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});
UserSchema.set("timestamps", true);

// Login
UserSchema.methods.matchPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

// Register
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("users", UserSchema); //users: ten collection trong DB
