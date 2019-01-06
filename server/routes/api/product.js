const express = require("express");
const mongoose = require("mongoose");

const model = require("../../models");
const { auth, admin } = require("../../middleware");

const router = express.Router();

router.post("/", auth, admin, async (req, res) => {
  try {
    const product = await model.Product.create(req.body);

    if (!product) return res.json({ success: false });

    res.status(200).json({ success: true, product });
  } catch (err) {
    console.log("Add Product Error: ", err.message);
  }
});

// /?id=id1,id2,id3&type=array or single
router.get("/", async (req, res) => {
  try {
    let type = req.query.type;
    let items = req.query.id;

    if (type === "array") {
      let ids = items.split(",");
      items = [];
      items = ids.map(item => mongoose.Types.ObjectId(item));
    }

    const products = await model.Product.find({ _id: { $in: items } })
      .populate("brand")
      .populate("wood");

    if (products.length === 0)
      return res.json({ message: "No products to display" });

    res.status(200).json(products);
  } catch (err) {
    console.log("Get Products by IDs Error: ", err.message);
    return res.json({ error: true });
  }
});

// BY Arrival
// /?sortBy=createdAt&order=desc&limit=4

// BY Sell
// items/?sortBy=sold&order=desc&limit=4
router.get("/items", async (req, res) => {
  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let order = req.query.order ? req.query.order : "asc";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    const products = await model.Product.find({})
      .populate("brand")
      .populate("wood")
      .sort([[sortBy, order]])
      .limit(limit);

    if (products.length === 0)
      return res.json({ message: "No Products to display." });

    res.status(200).json(products);
  } catch (err) {
    console.log("Get New Arrival & Best Sell Error: ", err.message);
  }
});

// Shop Products
router.post("/shop", async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = parseInt(req.body.skip);

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  findArgs["publish"] = true;

  // Get Products
  const products = await model.Product.find(findArgs)
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit);

  if (products.length === 0)
    return res.json({ message: "No Products to display!" });

  res.status(200).json({
    size: products.length,
    items: products
  });
});

module.exports = router;
