const express = require("express");

const model = require("../../models");
const { auth, admin } = require("../../middleware");

const router = express.Router();

router.post("/wood", auth, admin, async (req, res) => {
  try {
    const wood = await model.Wood.create(req.body);

    if (!wood) return res.json({ success: false });

    res.status(200).json({ success: true, wood });
  } catch (err) {
    console.log("Add Wood Error: ", err.message);
  }
});

router.get("/woods", async (req, res) => {
  try {
    const woods = await model.Wood.find({});

    if (woods.length === 0) return res.json({ message: "No woods to display" });

    res.status(200).json(woods);
  } catch (err) {
    console.log("Get Woods Error: ", err.message);
  }
});

module.exports = router;
