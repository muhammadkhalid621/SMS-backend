const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetExpiration: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["parent", "teacher", "administrator", "super_admin"],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
