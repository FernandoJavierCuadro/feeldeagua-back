const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports = (mongoose, Schema) => {
  const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    tokens: [],
  });

  userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  });

  const User = mongoose.model("User", userSchema);

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  return User;
};
