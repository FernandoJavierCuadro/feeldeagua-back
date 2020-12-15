const jwt = require("express-jwt");
const {
  getArtists,
  getArtist,
  getAdminArtists,
  addArtist,
  updateArtist,
  deleteArtist,
} = require("../controllers/artistController");

function artistRoutes(app) {
  app.get("/api/v1/artists", getArtists);

  app.get("/api/v1/artist/:_id", getArtist);

  app.get(
    "/api/v1/admin/artists",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    getAdminArtists
  );

  app.post(
    "/api/v1/admin/artists",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    addArtist
  );

  app.put(
    "/api/v1/admin/artists",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    updateArtist
  );

  app.delete(
    "/api/v1/admin/artists",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    deleteArtist
  );
}

module.exports = artistRoutes;
