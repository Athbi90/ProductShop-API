const express = require("express");
const cors = require("cors");
const productsRoutes = require("./products/routers");
const db = require("./db/models");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", productsRoutes);

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
