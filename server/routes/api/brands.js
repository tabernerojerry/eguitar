const express = require("express");

const model = require("../../models");
const { auth, admin } = require("../../middleware");

const router = express.Router();

router.post("/brand", auth, admin, async (req, res) => {
  try {
    const brand = await model.Brand.create(req.body);

    if (brand.length === 0) return res.json({ success: false });

    res.status(200).json({ success: true, brand });
  } catch (err) {
    console.log("Brand Error: ", err.message);
  }
});

router.get("/brands", async (req, res) => {
  try {
    const brands = await model.Brand.find({});

    if (!brands)
      return res.json({ message: "Currently No Brands to display." });

    res.status(200).json(brands);
  } catch (err) {
    console.log("Brands Error: ", err.message);
  }
});

module.exports = router;
