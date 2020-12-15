const { User } = require("../models");
const createToken = require("../utils/token");

module.exports = {
  logIn: async (req, res) => {
    try {
      const user = await User.findOne({ name: req.body.name });
      if (user === null) {
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

  addUser: async (req, res) => {
    const admin = await User.findById(req.user);
    if (admin !== null) {
      const user = await new User({
        name: req.body.name,
        password: req.body.password,
      });
      user.tokens = [createToken(user.id)];
      await user.save();
      res.json("user created");
    } else {
      res.json("unauthorized");
    }
  },

  updateUser: async (req, res) => {
    const admin = await User.findById(req.user);
    if (admin !== null) {
      const user = await User.findByIdAndUpdate(req.user, req.body, {
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
      const users = await User.findByIdAndDelete(req.user);
      res.json("user deleted");
    } else {
      res.json("unauthorized");
    }
  },
};
