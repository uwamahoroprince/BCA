const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./src/config/db");
const cors = require("cors");

const bisinessDefinition = require("./src/router/bisinessDefinition");
const bisinessIdea = require("./src/router/businessIdea");
const auth = require("./src/router/auth");
const user = require("./src/router/user");

const app = express();
const PORT = process.env.PORT;
//loading middlewares
app.use(express.json());
app.use(cors());
//excuting routes
app.use("/BCA/bisinessDefinition", bisinessDefinition);
app.use("/BCA/bisinessIdea", bisinessIdea);
app.use("/BCA/authentication", auth);
app.use("/BCA/register", user);
//LOADING DOTENV FILE
dotenv.config({ path: "./src/config/config.env" });
dbConnect();
app.listen(PORT, () => {
  console.log(`application started http://localhost:${PORT}`);
});
