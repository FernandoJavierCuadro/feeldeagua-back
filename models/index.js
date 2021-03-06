const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
);

const ArtistModel = require("./Artist");
const AlbumModel = require("./Album");
const UserModel = require("./User");

const Artist = ArtistModel(mongoose, Schema);
const Album = AlbumModel(mongoose, Schema);
const User = UserModel(mongoose, Schema);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", (e) => console.log("db connection ok!"));

module.exports = {
  mongoose,
  Artist,
  Album,
  User,
};
