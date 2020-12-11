const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const ArtistSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    albums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
  });

  const Artist = mongoose.model("Artist", ArtistSchema);

  return Artist;
};
