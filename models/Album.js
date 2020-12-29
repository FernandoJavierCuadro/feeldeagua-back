const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const albumSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    downloadLink: { type: String, required: false },
    releaseYear: { type: Number, required: true },
    artist: { type: Schema.Types.ObjectId, ref: "Artist" },
    draft: { type: Boolean, required: true },
  });

  const Album = mongoose.model("Album", albumSchema);

  return Album;
};
