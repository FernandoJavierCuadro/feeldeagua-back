const db = require("../db");
const { mongoose, Artist, Album, User } = require("../models");
const createToken = require("../utils/token");

module.exports = {
  seeder: async (req, res) => {
    const connection = mongoose.connection;
    await connection.dropDatabase();

    for (let i = 0; i < db.artists.length; i++) {
      const artist = new Artist({
        name: db.artists[i].name,
        description: db.artists[i].description,
        image: db.artists[i].image,
        albums: db.artists[i].albums,
        draft: false,
      });
      await artist.save();
    }

    for (let i = 0; i < db.albums.length; i++) {
      const album = new Album({
        name: db.albums[i].name,
        description: db.albums[i].description,
        image: db.albums[i].image,
        downloadLink: db.albums[i].downloadLink,
        releaseYear: db.albums[i].releaseYear,
        artist: db.albums[i].artist,
        draft: false,
      });
      const artist = await Artist.findOne({ name: db.albums[i].artist });
      artist.albums.push(album);
      await artist.save();
      await album.save();
    }

    const user = new User({
      name: "admin",
      password: "admin",
    });
    user.tokens = [createToken(user.id)];
    await user.save();

    res.json("new database created");
  },
};
