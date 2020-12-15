const { Album, Artist, User } = require("../models");

module.exports = {
  getAlbumDownload: async (req, res) => {
    const album = await Album.findById(req.params["_id"]);
    res.json(album);
  },

  getAlbum: async (req, res) => {
    if (user !== null) {
      const album = await Album.findById(req.params["_id"]);
      res.json(album);
    } else {
      res.json("unauthorized");
    }
  },

  addAlbum: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const album = await new Album({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
      });

      const artist = await Artist.findById(req.body.artist);
      artist.albums.push(album);
      await artist.save();
      await album.save();

      res.json(album);
    } else {
      res.json("unauthorized");
    }
  },

  updateAlbum: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const album = await Album.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      res.json("album updated");
    } else {
      res.json("unauthorized");
    }
  },

  deleteAlbum: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const album = await Album.findByIdAndDelete(req.body._id);
      return res.json("album deleted");
    } else {
      return res.json("unauthorized");
    }
  },
};
