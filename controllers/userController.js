const { User } = require("../models");
const createToken = require("../utils/token");

module.exports = {
  addUser: async (req, res) => {
    const admin = await User.findById(req.user);
    if (admin === true) {
      const user = await new User({
        name: req.body.name,
        password: req.body.password,
      });
      user.tokens = [createToken(user.id)];
      await user.save();
      res.json({
        name: user.name,
        token: user.tokens[0],
      });
    } else {
      res.json("unauthorized");
    }
  },

  logIn: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      if (!(await user.validPassword(req.body.password))) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const newToken = createToken(user.id);
      user.tokens.push(newToken);
      user.save();

      res.json({
        name: user.name,
        token: user.tokens[user.tokens.length - 1],
      });
    } catch (err) {
      console.log("Something failed", err);
      res.status(500).json({ message: "Something failed on server side" });
    }
  },

  updateUser: async (req, res) => {
    const admin = await User.findById(req.user);
    if (admin !== null) {
      const user = await User.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      res.json("user updated");
    } else {
      res.json("unauthorized");
    }
  },

  deleteUser: async (req, res) => {
    const admin = await User.findById(req.user);
    if (admin !== null) {
      const users = await User.findByIdAndDelete(req.body._id);
      res.json("user deleted");
    } else {
      res.json("unauthorized");
    }
  },
};
