const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productImg: String,
  productName: String,
  price: Number,
  quantity: Number,

  productId: {
    type: String,
    require: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
