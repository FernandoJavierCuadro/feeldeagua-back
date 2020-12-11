const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const ArtistSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    albums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
  });

  const Artist = mongoose.model("Artist", ArtistSchema);

  return Artist;
};
