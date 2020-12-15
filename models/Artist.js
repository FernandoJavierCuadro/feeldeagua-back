const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const artistSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    albums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
    draft: { type: Boolean, required: false },
  });

  const Artist = mongoose.model("Artist", artistSchema);

  return Artist;
};
