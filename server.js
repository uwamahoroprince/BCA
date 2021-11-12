const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./src/config/db");
// const gg = require("./src/config/config.env");

const app = express();
const PORT = 3000;
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "express is up and running",
  });
});
//LOADING DOTENV FILE
dotenv.config({ path: "./src/config/config.env" });
dbConnect();
app.listen(PORT, () => {
  console.log(`application started http://localhost:${PORT}`);
});
