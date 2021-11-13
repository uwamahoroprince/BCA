const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./src/config/db");

const bisinessDefinition = require("./src/router/bisinessDefinition");
const bisinessIdea = require("./src/router/businessIdea");

const app = express();
const PORT = process.env.PORT;
//loading middlewares
app.use(express.json());

//excuting routes
app.use("/BCA/bisinessDefinition", bisinessDefinition);
app.use("/BCA/bisinessIdea", bisinessIdea);
//LOADING DOTENV FILE
dotenv.config({ path: "./src/config/config.env" });
dbConnect();
app.listen(PORT, () => {
  console.log(`application started http://localhost:${PORT}`);
});
