const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const Review = require("../models/Review");
const { isLoggedIn } = require("../middleware");

// Get All the Products
router.get("/products", async (req, res) => {
  const products = await Product.find({}); // Returns all the prodcucts
  res.render("./products/product", { products });
});

// Get form to create a new product
router.get("/products/new", async (req, res) => {
  res.render("./products/new");
});

// Create a new product
router.post("/products", async (req, res) => {
  const { name, img, desc, price } = req.body;
  await Product.create({ name, img, desc, price });
  req.flash("success", "Your product has been created sucessfully");
  res.redirect("/products");
});

// Show a single product
router.get("/products/:productid", isLoggedIn, async (req, res) => {
  const { productid } = req.params;
  const product = await Product.findById(productid).populate("review");
  res.render("./products/show", { product });
});

//  Get the edit form
router.get("/products/:productid/edit", isLoggedIn, async (req, res) => {
  const { productid } = req.params;

  const product = await Product.findById(productid);

  res.render("./products/edit", { product });
});

// Update a product
router.patch("/products/:productid", async (req, res) => {
  const { name, img, price, desc } = req.body;

  const { productid } = req.params;

  await Product.findByIdAndUpdate(productid, { name, img, price, desc });

  req.flash("success", "Your product has been updated.");

  res.redirect(`/products/${productid}`);
});

// Delete a product
router.delete("/products/:productid", async (req, res) => {
  const { productid } = req.params;

  await Product.findByIdAndDelete(productid);

  res.redirect("/products");
});

router.get("/cart", (req, res) => {
  res.render("./products/cart");
});

router.post("/products/:productid", async (req, res) => {
  const { productid } = req.params;

  // const { productname } = req.body;

  // Find the currentuser in which you want to add product
  const prodcut = await User.findOne(productid);

  await user.prodcuts.push(productid);

  await user.save(); // To save the content of array
  res.redirect(`/products/`);
});

module.exports = router;
