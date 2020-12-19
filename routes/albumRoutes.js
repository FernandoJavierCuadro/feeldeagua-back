const jwt = require("express-jwt");
const {
  getAlbumDownload,
  getAdminAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");

function albumRoutes(app) {
  app.get("/api/v1/album/download/:_id", getAlbumDownload);

  app.get(
    "/api/v1/admin/albums",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    getAdminAlbums
  );

  app.post(
    "/api/v1/admin/albums",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    addAlbum
  );

  app.put(
    "/api/v1/admin/albums",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    updateAlbum
  );

  app.delete(
    "/api/v1/admin/albums",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    deleteAlbum
  );
}

module.exports = albumRoutes;
