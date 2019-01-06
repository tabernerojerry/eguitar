const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema({
  featured: {
    type: Array,
    require: true,
    default: []
  },
  siteInfo: {
    type: Array,
    require: true,
    default: []
  }
});

const Site = mongoose.model("Site", SiteSchema);

module.exports = Site;
