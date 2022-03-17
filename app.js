const express = require("express");
const app = express();
//const router = express.Router();
//import * as Controller from "./controller/oneInch.js";

const oneinchRouter = require("./routes/router");
app.use("/", oneinchRouter);

//router.get("/", Controller.test);

app
  .listen(9000, () => {
    console.log("Server Started");
  })
  .on("error", function (err) {
    console.log("Error!", err);
  });
