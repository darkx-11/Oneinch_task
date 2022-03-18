const express = require("express");
const app = express();
const oneinchRouter = require("./routes/router");
app.use("/", oneinchRouter);

app
  .listen(9000, () => {
    console.log("Server Started");
  })
  .on("error", function (err) {
    console.log("Error!", err);
  });
