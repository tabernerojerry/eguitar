const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    maxlength: 100
  }
});

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
