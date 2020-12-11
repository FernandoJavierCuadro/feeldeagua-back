const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const AlbumSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    trackList: [{ type: String, required: true }],
    downloadLink: { type: String, required: true },
    releaseYear: { type: Number, required: true },
  });

  const Album = mongoose.model("Album", AlbumSchema);

  return Album;
};
