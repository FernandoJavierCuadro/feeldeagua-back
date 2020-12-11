const { Album } = require("../models");

module.exports = {
  getAlbum: async (req, res) => {
    const album = await Album.findById(req.album).populate("albums");
    res.json(album);
  },

  addAlbum: async (req, res) => {
    const user = await User.findById(req.user);
    if (user === true) {
      const album = await new Album({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
      });
      res.json(album);
    } else {
      res.json("unauthorized");
    }
  },

  updateAlbum: async (req, res) => {
    const user = await User.findById(req.user);
    if (user === true) {
      const album = await Album.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      res.json("user updated");
    } else {
      res.json("unauthorized");
    }
  },

  deleteAlbum: async (req, res) => {
    const user = await User.findById(req.user);
    if (user === true) {
      const album = await Album.findByIdAndDelete(req.body._id);
      return res.json("album deleted");
    } else {
      return res.json("unauthorized");
    }
  },
};
