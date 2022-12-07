const express = require("express");
const { connection } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");
const { signupController } = require("./controllers/signup.controller");
const { loginController } = require("./controllers/login.controller");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/signup", signupController);
app.use("/login", loginController);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connnected to db successfully");
  } catch (err) {
    console.log("Error connecting to db");
    console.log(err);
  }
  console.log(`listening on port ${process.env.PORT}`);
});
