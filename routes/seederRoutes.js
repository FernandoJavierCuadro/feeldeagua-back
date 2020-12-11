const { seeder } = require("../controllers/seederController");

function seederRoutes(app) {
  app.get("/api/v1/seed", seeder);
}

module.exports = seederRoutes;
