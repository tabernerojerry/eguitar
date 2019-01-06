const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");

require("dotenv/config");
require("./db");

const users = require("./routes/api/users");
const brands = require("./routes/api/brands");
const woods = require("./routes/api/woods");
const products = require("./routes/api/product");
const site = require("./routes/api/site");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Cloudinary Config
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET
});

// Nodemailer


/**
 * API Routes
 */
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/products", brands);
app.use("/api/products", woods);
app.use("/api/site", site);

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
