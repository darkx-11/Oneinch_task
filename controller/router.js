const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

router.get("/oneinchquote", (req, res) => {
  const buy = req.query.buyToken;
  console.log("HERE is HOME!");
  console.log(buy);
  console.log("Length-", buy.length);

  res.send("This is " + buy);
});
router.get("/oneinchswap", async (req, res) => {
  console.log("HERE is oneINCH!");
  res.send("This is oneINCH!!");
});

module.exports = router;
