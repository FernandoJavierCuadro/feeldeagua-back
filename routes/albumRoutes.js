const jwt = require("express-jwt");
const {
  getAlbum,
  addAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");

function albumRoutes(app) {
  app.get("api/v1/album", getAlbum);

  app.post(
    "/api/v1/albums",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    addAlbum
  );

  app.post(
    "/api/v1/albums/update",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    updateAlbum
  );

  app.delete(
    "/api/v1/albums",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    deleteAlbum
  );
}

module.exports = albumRoutes;
