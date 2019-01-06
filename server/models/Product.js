const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      maxlength: 255
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true
    },
    wood: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wood",
      required: true
    },
    shipping: {
      type: Boolean,
      required: true
    },
    available: {
      type: Boolean,
      required: true
    },
    frets: {
      type: Number,
      required: true
    },
    sold: {
      type: Number,
      default: 0,
      maxlength: 100
    },
    publish: {
      type: Boolean,
      required: true
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
