const model = require("../models");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.e_auth;

    const user = await model.User.findByToken(token);

    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = auth;
