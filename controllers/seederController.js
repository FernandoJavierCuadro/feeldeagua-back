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

    const user = new User({
      name: "admin",
      password: "admin",
    });
    user.tokens = [createToken(user.id)];
    await user.save();

    res.json("new database created");
  },
};
