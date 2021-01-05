const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const albumSchema = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: false },
      downloadLink: { type: String, required: false },
      releaseYear: { type: Number, required: true },
      artist: { type: String, required: true },
      draft: { type: Boolean, required: true },
    },
    { timestamps: true }
  );

  const Album = mongoose.model("Album", albumSchema);

  return Album;
};
