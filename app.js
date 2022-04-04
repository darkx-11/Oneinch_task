import express from "express";
const app = express();
import { oneinchRouter } from "./routes/router.js";
app.use("/", oneinchRouter);

app
  .listen(9000, () => {
    console.log("Server Started");
  })
  .on("error", function (err) {
    console.log("Error!", err);
  });
