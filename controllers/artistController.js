const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { Artist, User } = require("../models");

module.exports = {
  getArtists: async (req, res) => {
    const artists = await Artist.find({ draft: false });
    res.json(artists);
  },

  getArtistsByName: async (req, res) => {
    const artists = await Artist.find({
      name: { $regex: req.query.name, $options: "i" },
      draft: false,
    }).limit(10);
    res.json(artists);
  },

  getArtist: async (req, res) => {
    const artist = await Artist.findById(req.params["_id"]).populate({
      path: "albums",
      match: { draft: false },
    });
    res.json(artist);
  },

  getAdminArtists: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const artists = await Artist.find();
      res.json(artists);
    } else {
      res.json("unauthorized");
    }
  },

  getAdminArtistsByName: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const artists = await Artist.find({
        name: { $regex: req.query.name, $options: "i" },
      }).limit(10);
      res.json(artists);
    } else {
      res.json("unauthorized");
    }
  },

  addArtist: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const form = formidable();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log(err);
          return;
        }

        let artist = await new Artist(fields);
        if (files.image) {
          artist.image = `/images/${files.image.name}`;
        }
        let fileDir = path.resolve("public") + `/images/${files.image.name}`;
        let img = fs.readFileSync(files.image.path);
        fs.writeFile(fileDir, img, (err) => {
          if (err) throw err;
          console.log("The file has been saved!");
        });
        await artist.save();
        res.json(artist);
      });
    } else {
      res.json("unauthorized");
    }
  },

  updateArtist: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const artist = await Artist.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      res.json("artist updated");
    } else {
      res.json("unauthorized");
    }
  },

  deleteArtist: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const artist = await Artist.findByIdAndDelete(req.body._id);
      return res.json("artist deleted");
    } else {
      return res.json("unauthorized");
    }
  },
};
