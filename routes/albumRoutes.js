const jwt = require("express-jwt");
const {
  getAlbums,
  getAlbumDownload,
  getAdminAlbums,
  getAdminAlbumsByName,
  addAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");

function albumRoutes(app) {
  app.get("/api/v1/albums", getAlbums);

  app.get("/api/v1/album/download/:_id", getAlbumDownload);

  app.get(
    "/api/v1/admin/albums",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    getAdminAlbums
  );

  app.get(
    "/api/v1/admin/albums/search",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    getAdminAlbumsByName
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
