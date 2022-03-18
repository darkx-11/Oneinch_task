const { range } = require("express/lib/request");
const ExecuteQuote = require("../resolver/oneInchmulti");

async function oneInchV4multiswap(req, res) {
  try {
    const buyToken = req.query.buyToken; //To token addr
    const sellToken = req.query.sellToken; //From token addr
    const sellAmount = req.query.sellAmount;
    const dsaAddr = req.query.dsaAddress;
    if (!buyToken)
      return res.status(400).json({ error: "buyToken-query-missing" });
    if (!sellToken)
      return res.status(400).json({ error: "sellToken-query-missing" });
    if (!sellAmount)
      return res.status(400).json({ error: "sellAmount-query-missing" });
    if (sellAmount <= 0)
      return res.status(400).json({ error: "sellAmount-invaild" });
    if (!dsaAddr)
      return res.status(400).json({ error: "dsaAddress-query-missing" });

    if (
      buyToken.length != sellToken.length ||
      buyToken.length != sellAmount.length ||
      buyToken.length != dsaAddr.length
    ) {
      return res.status(400).json({ error: "Array lengths do not match" });
    }

    for (var i = 0; i < buyToken.length; i++) {
      var _buyToken = buyToken[i];
      var _sellToken = sellToken[i];
      var _sellAmount = sellAmount[i];
      var _dsaAddr = dsaAddr[i];
      console.log(
        "Index",
        i,
        "Values",
        _buyToken,
        _sellToken,
        _sellAmount,
        _dsaAddr
      );
      //Logic of single swap
    }

    res.send("Swap Successfull!!");
    // return res.status(200).json({ result: "Swap Successfull" });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
}

async function oneInchV4multiquote(req, res) {
  try {
    const buyToken = req.query.buyToken;
    const sellToken = req.query.sellToken;
    const sellAmount = req.query.sellAmount;
    if (!buyToken)
      return res.status(400).json({ error: "buyToken-query-missing" });
    if (!sellToken)
      return res.status(400).json({ error: "sellToken-query-missing" });
    if (!sellAmount)
      return res.status(400).json({ error: "sellAmount-query-missing" });
    if (sellAmount <= 0)
      return res.status(400).json({ error: "sellAmount-invaild" });
    if (
      buyToken.length != sellToken.length ||
      buyToken.length != sellAmount.length
    ) {
      return res.status(400).json({ error: "Array lengths do not match" });
    }

    for (var i = 0; i < buyToken.length; i++) {
      var _buyToken = buyToken[i];
      var _sellToken = sellToken[i];
      var _sellAmount = sellAmount[i];
      console.log("Index", i, "Values", _buyToken, _sellToken, _sellAmount);
      //Single Quote Logic
      var quoteParams = {
        fromTokenAddress: _sellToken, // 1INCH
        toTokenAddress: _buyToken, // DAI
        amount: _sellAmount,
      };
      ExecuteQuote(quoteParams);
    }

    res.send("Quote Successfull!!");
  } catch (error) {
    return res.status(400).send({ error });
  }
}
module.exports = {
  oneInchv4multiswap: oneInchV4multiswap,
  oneInchV4multiquote: oneInchV4multiquote,
};
