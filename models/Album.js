const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const albumSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    downloadLink: { type: String, required: false },
    releaseYear: { type: Number, required: false },
    artist: { type: String, required: true },
    draft: { type: Boolean, required: false },
  });

  const Album = mongoose.model("Album", albumSchema);

  return Album;
};
