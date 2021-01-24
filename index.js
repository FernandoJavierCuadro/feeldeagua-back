require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const artistRoutes = require("./routes/artistRoutes");
const albumRoutes = require("./routes/albumRoutes");
const userRoutes = require("./routes/userRoutes");
const seederRoutes = require("./routes/seederRoutes");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ exposedHeaders: "Content-disposition" }));

artistRoutes(app);
albumRoutes(app);
userRoutes(app);
seederRoutes(app);

app.listen(process.env.APP_PORT, () => {
  console.log("ingresar a " + process.env.APP_PORT);
});
