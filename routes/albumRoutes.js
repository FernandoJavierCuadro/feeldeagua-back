const jwt = require("express-jwt");
const {
  getAlbum,
  getAlbumDownload,
  addAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");

function albumRoutes(app) {
  app.get(
    "api/v1/album/download/:_id",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    getAlbumDownload
  );

  app.get(
    "api/v1/album/:_id",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    getAlbum
  );

  app.post(
    "/api/v1/album",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    addAlbum
  );

  app.put(
    "/api/v1/album",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    updateAlbum
  );

  app.delete(
    "/api/v1/album",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    deleteAlbum
  );
}

module.exports = albumRoutes;
