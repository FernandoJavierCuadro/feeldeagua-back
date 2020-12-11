const { Artist } = require("../models");

module.exports = {
  getArtists: async (req, res) => {
    const artists = await Artist.find();
    res.json(artists);
  },

  getArtist: async (req, res) => {
    const artist = await Artist.findById(req.artist).populate("albums");
    res.json(artist);
  },

  addArtist: async (req, res) => {
    const user = await User.findById(req.user);
    if (user === true) {
      const artist = await new Artist({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
      });
      res.json(artist);
    } else {
      res.json("unauthorized");
    }
  },

  updateArtist: async (req, res) => {
    const user = await User.findById(req.user);
    if (user === true) {
      const artist = await Artist.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      res.json("user updated");
    } else {
      res.json("unauthorized");
    }
  },

  deleteArtist: async (req, res) => {
    const user = await User.findById(req.user);
    if (user === true) {
      const artist = await Artist.findByIdAndDelete(req.body._id);
      return res.json("artist deleted");
    } else {
      return res.json("unauthorized");
    }
  },
};
