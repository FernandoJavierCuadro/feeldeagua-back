const jwt = require("express-jwt");
const { validate } = require("../utils/validation");

const {
  logIn,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

function userRoutes(app) {
  app.post("/api/v1/users/login", validate, logIn);

  app.post(
    "/api/v1/users",
    validate,
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    addUser
  );

  app.put(
    "/api/v1/users",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    updateUser
  );

  app.delete(
    "/api/v1/users",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    deleteUser
  );
}

module.exports = userRoutes;
