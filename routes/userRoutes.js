const jwt = require("express-jwt");
const { validate } = require("../validation");

const {
  addUser,
  logIn,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

function userRoutes(app) {
  app.post("/api/v1/users/addUser", validate, addUser);

  app.post("/api/v1/users/login", validate, logIn);

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
