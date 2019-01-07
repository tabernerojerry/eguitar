const express = require("express");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const async = require("async");
const SHA1 = require("crypto-js/sha1");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const bcrypt = require("bcryptjs");

const model = require("../../models");
const { auth, admin } = require("../../middleware");

const sendMail = require("../../mail");

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`);
  }
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname);
  //   if (ext !== ".jpg" || ext !== ".png") {
  //     return cb(res.status(400).end("Only jpg, png is allowed"), false);
  //   }

  //   cb(null, true);
  // }
});
const upload = multer({ storage: storage }).single("file");

// Upload File using Multer
router.post("/uploadFile", auth, admin, (req, res) => {
  upload(req, res, err => {
    if (err) return res.json({ success: false, err });

    return res.json({ success: true });
  });
});

// Get Uploaded Files
router.get("/adminFiles", auth, admin, (req, res) => {
  const dir = path.resolve(".") + "/uploads/";
  fs.readdir(dir, (err, items) => {
    let images = [];
    items.forEach(item => {
      images.push(`/static/${item}`);
    });

    return res.status(200).json({ items, images });
  });
});

// Download Files
router.get("/download/:id", auth, admin, (req, res) => {
  const file = path.resolve(".") + `/uploads/${req.params.id}`;
  res.download(file);
});

// Email Reset Password URL with token
router.post("/reset_user", async (req, res) => {
  const [user] = await model.User.find({ email: req.body.email }).limit(1);

  if (!user) {
    return res.json({ success: false });
  }

  const data = await user.generateResetToken(user.email);

  if (!data) {
    return res.json({ success: false });
  }

  sendMail(user.email, user.firstName, null, "reset_password", data);

  res.status(200).json({ success: true });
});

// Reset Password URL
router.post("/reset_password", async (req, res) => {
  const today = moment()
    .startOf("day")
    .valueOf();

  const [user] = await model.User.find({
    resetToken: req.body.resetToken,
    resetTokenExp: { $gte: today }
  }).limit(1);

  if (!user) {
    return res.json({
      success: false,
      message: "Sorry, token bad, generate a new one."
    });
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const newData = {
    password: hashPassword,
    resetToken: "",
    resetTokenExp: null
  };

  const data = await model.User.findOneAndUpdate({ _id: user._id }, newData, {
    new: true
  });

  if (!data) {
    return res.json({ success: false });
  }

  res.status(200).json({ success: true });
});

// Auth Data
router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

// Register User
router.post("/register", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = await model.User.create({
      ...req.body,
      password: hashPassword
    });

    if (!user) return res.json({ success: false });

    // Send Welcome mail to registered user
    sendMail(user.email, user.firstName, null, "welcome");

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("Register Error: ", err.message);
    return res.json({ success: false, errors: err.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const [user] = await model.User.find({ email: req.body.email }).limit(1);

    if (!user || !(await user.matchPassword(req.body.password))) {
      return res.json({
        success: false,
        message: "Incorrect email or password. Please try again."
      });
    }

    const token = await user.generateToken();

    if (!token) return res.status(400).json({ success: false });

    res
      .cookie("e_auth", token)
      .status(200)
      .json({ success: true });
  } catch (err) {
    console.log("Auth Error: ", err.message);
  }
});

// Logout User
router.get("/logout", auth, async (req, res) => {
  try {
    const user = await model.User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" },
      { new: true }
    );

    if (!user) return res.json({ success: false });

    res.status(200).json({ success: true });
  } catch (err) {
    console.log("Logout Error: ", err.message);
  }
});

// Upload images from Cloudinary
router.post("/uploadimage", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      console.log(result);
      res.status(200).json({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto"
    }
  );
});

// Delete images from Cloudinary
router.get("/removeimage", auth, admin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false });
    res.status(200).json({ success: true });
  });
});

// Add Product To Cart
router.post("/addToCart", auth, async (req, res) => {
  const [user] = await model.User.find({ _id: req.user._id }).limit(1);

  let duplicate = false;

  user.cart.forEach(item => {
    if (item.id.toString() === req.query.productId.toString()) {
      duplicate = true;
    }
  });

  if (duplicate) {
    const updatedData = await model.User.findOneAndUpdate(
      {
        _id: req.user._id,
        "cart.id": mongoose.Types.ObjectId(req.query.productId)
      },
      {
        $inc: { "cart.$.quantity": 1 }
      },
      { new: true }
    );

    if (!updatedData) {
      return res.json({ success: false });
    }

    res.status(200).json(updatedData.cart);
  } else {
    const data = await model.User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          cart: {
            id: mongoose.Types.ObjectId(req.query.productId),
            quantity: 1,
            date: Date.now()
          }
        }
      },
      { new: true }
    );

    if (!data) {
      return res.json({ success: false });
    }

    res.status(200).json(data.cart);
  }
});

// Remove product to cart
router.get("/removeFromCart", auth, async (req, res) => {
  try {
    const data = await model.User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $pull: {
          cart: { id: mongoose.Types.ObjectId(req.query._id) }
        }
      },
      { new: true }
    );

    const cart = data.cart;
    const array = cart.map(item => mongoose.Types.ObjectId(item.id));

    const cartDetail = await model.Product.find({ _id: { $in: array } })
      .populate("brand")
      .populate("wood");

    res.status(200).json({
      cartDetail,
      cart
    });
  } catch (err) {
    console.log("Error Remove Cart Item: ", err.message);
    return res.json({ error: true });
  }
});

// Success Buy
router.post("/successBuy", auth, async (req, res) => {
  try {
    let history = [];
    let transactionData = {};

    const date = new Date();
    const PO = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(
      req.user._id
    )
      .toString()
      .substring(0, 8)}`;

    // User Purchased History
    req.body.cartDetail.forEach(item => {
      history.push({
        id: item._id,
        name: item.name,
        brand: item.brand.name,
        price: item.price,
        quantity: item.quantity,
        paymentId: req.body.paymentData.paymentID,
        dateOfPurchase: Date.now(),
        purchaseOrder: PO
      });
    });

    // Payments Dashboard
    transactionData.user = {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email
    };
    transactionData.data = {
      ...req.body.paymentData,
      purchaseOrder: PO
    };
    transactionData.product = history;

    const user = await model.User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { history: history }, $set: { cart: [] } },
      { new: true }
    );

    if (!user) {
      return res.json({ success: false });
    }

    const payment = new model.Payment(transactionData);
    payment.save((err, doc) => {
      if (err) return res.json({ success: false });

      let products = [];

      doc.product.forEach(item => {
        products.push({ id: item.id, quantity: item.quantity });
      });

      async.eachSeries(
        products,
        (item, callback) => {
          model.Product.update(
            { _id: item.id },
            { $inc: { sold: item.quantity } },
            { new: false },
            callback
          );
        },
        err => {
          if (err) return res.json({ success: false });

          // Send Purchase Order Mail to user
          sendMail(
            user.email,
            user.firstName,
            null,
            "purchase",
            transactionData
          );

          res.status(200).json({
            success: true,
            cart: user.cart,
            cartDetail: []
          });
        }
      );
    });
  } catch (err) {
    console.log("Error Success Buyer: ", err);
  }
});

// Update Profile
router.post("/update_profile", auth, async (req, res) => {
  const user = await model.User.findOneAndUpdate(
    { _id: req.user._id },
    req.body,
    { new: true }
  );

  if (!user) {
    return res.json({ success: false });
  }

  res.status(200).json({ success: true });
});

module.exports = router;
