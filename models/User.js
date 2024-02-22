const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  role: String,

  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
