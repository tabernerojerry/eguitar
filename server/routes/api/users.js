const express = require("express");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const async = require("async");

const model = require("../../models");
const { auth, admin } = require("../../middleware");

const sendMail = require("../../mail");

const router = express.Router();

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

router.post("/register", async (req, res) => {
  try {
    const user = await model.User.create(req.body);

    if (!user) return res.json({ success: false });

    // Send Welcome mail to registered user
    sendMail(user.email, user.firstName, null, "welcome");

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("Register Error: ", err.message);
    return res.json({ success: false, errors: err.message });
  }
});

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

// remove product to cart
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
  let history = [];
  let transactionData = {};

  // User Purchased History
  req.body.cartDetail.forEach(item => {
    history.push({
      id: item._id,
      name: item.name,
      brand: item.brand.name,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
      dateOfPurchase: Date.now()
    });
  });

  // Payments Dashboard
  transactionData.user = {
    id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  };
  transactionData.data = req.body.paymentData;
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

        res.status(200).json({
          success: true,
          cart: user.cart,
          cartDetail: []
        });
      }
    );
  });
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
