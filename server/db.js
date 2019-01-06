const mongoose = require("mongoose");

const { DB_NAME, DB_PORT, DB_HOST } = process.env;
const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports = (async () => {
  try {
    await mongoose.connect(
      DB_URL,
      { useNewUrlParser: true }
    );

    console.log("MongoDB Connected!");
  } catch (err) {
    console.log("Error: ", err.message);
  }
})();
