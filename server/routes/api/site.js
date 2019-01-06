const express = require("express");
const mongoose = require("mongoose");

const model = require("../../models");

const router = express.Router();

const { auth, admin } = require("../../middleware");

router.get("/site_data", async (req, res) => {
  const data = await model.Site.find({});

  if (!data) {
    return res.status.apply(400);
  }

  res.status(200).json(data[0].siteInfo);
});

// Update Site Info
router.post("/site_data", auth, admin, async (req, res) => {
  const data = await model.Site.findOneAndUpdate(
    { name: "Site" },
    { siteInfo: req.body },
    { new: true }
  );

  if (!data) {
    return res.json({ success: false });
  }

  res.status(200).json({ success: true, siteInfo: data.siteInfo });
});

module.exports = router;
