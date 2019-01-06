const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: ({ value }) => `Email ${value} has already taken.` // TODO: Security
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

// Hash the password before save
UserSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

UserSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = async function() {
  // this = user data
  try {
    const token = jwt.sign(this._id.toString(), process.env.SECRET);

    const data = await User.findOneAndUpdate(
      { _id: this._id },
      { token: token },
      {
        new: true
      }
    );

    return data.token;
  } catch (err) {
    console.log(err.message);
  }
};

UserSchema.statics.findByToken = async function(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const [user] = await User.find({ _id: decoded, token: token }).limit(1);

    if (!mongoose.Types.ObjectId.isValid(decoded) || !user) return;

    return user;
  } catch (err) {
    console.log(err.message);
    return;
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
