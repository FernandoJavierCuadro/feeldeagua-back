const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { Album, Artist, User } = require("../models");

module.exports = {
  getAlbums: async (req, res) => {
    const albums = await Album.find({ draft: false }).sort({ createdAt: -1 });
    res.json(albums);
  },

  getLatestAlbums: async (req, res) => {
    const albums = await Album.find({ draft: false })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(albums);
  },

  getAlbumDownload: async (req, res) => {
    const album = await Album.findById(req.params._id);
    const file = res.download(album.downloadLink);
  },

  getAdminAlbums: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const albums = await Album.find().sort({ createdAt: -1 });
      res.json(albums);
    } else {
      res.json("unauthorized");
    }
  },

  getAdminAlbumsByName: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const albums = await Album.find({
        name: { $regex: req.query.name, $options: "i" },
      }).sort({ createdAt: -1 });
      res.json(albums);
    } else {
      res.json("unauthorized");
    }
  },

  addAlbum: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const form = formidable();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log(err);
          return;
        }
        let album = await new Album(fields);
        if (files.image) {
          album.image = `/images/albums/${files.image.name}`;
        }
        let imgDir =
          path.resolve("public") + `/images/albums/${files.image.name}`;
        let img = fs.readFileSync(files.image.path);
        fs.writeFile(imgDir, img, (err) => {
          if (err) throw err;
          console.log("The file has been saved!");
        });

        if (files.file) {
          album.downloadLink =
            path.resolve("public") + `/albums/${fields.imageName}`;
        }
        let fileDir = path.resolve("public") + `/albums/${fields.imageName}`;
        let file = fs.readFileSync(files.file.path);
        fs.writeFile(fileDir, file, (err) => {
          if (err) throw err;
          console.log("The file has been saved!");
        });
        const artist = await Artist.findOne({ name: fields.artist });
        artist.albums.push(album);
        album.artist = artist.name;
        await artist.save();
        await album.save();

        res.json("album created");
      });
    } else {
      res.json("unauthorized");
    }
  },

  updateAlbum: async (req, res) => {
    const user = await User.findById(req.user);
    if (user !== null) {
      const form = formidable();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log(err);
          return;
        }
        let album = await Album.findByIdAndUpdate(fields._id, fields, {
          new: true,
        });

        if (files.image) {
          album.image = `/images/albums/${fields.imageName}`;
          let fileDir =
            path.resolve("public") + `/images/albums/${fields.imageName}`;
          let img = fs.readFileSync(files.image.path);
          fs.writeFile(fileDir, img, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
          });
        }
        if (files.file) {
          album.downloadLink =
            path.resolve("public") + `/albums/${files.file.name}`;
          let fileDir = path.resolve("public") + `/albums/${files.file.name}`;
          let file = fs.readFileSync(files.file.path);
          fs.writeFile(fileDir, file, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
          });
        }
        await album.save();
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
