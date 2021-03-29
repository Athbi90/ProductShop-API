const express = require("express");
const cors = require("cors");
const passport = require("passport");
//Routers Import
const productsRoutes = require("./products/routers");
const usersRoutes = require("./db/Users/routes");
const { localStrategy } = require("./middleware/passport");
const db = require("./db/models");

const app = express();
app.use(express.json());
app.use(cors());

// Passport setup
app.use(passport.initialize());
passport.use(localStrategy);
// Routers
app.use("/", productsRoutes);
app.use("/", usersRoutes);

const run = async () => {
  try {
    await db.sequelize.sync({ force: false });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
