const admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = admin;
