const { range } = require("express/lib/request");

async function oneInchV4Swap(req, res) {
  try {
    const buyToken = req.query.buyToken;
    const sellToken = req.query.sellToken;
    const sellAmount = req.query.sellAmount;
    const dsaAddr = req.query.dsaAddress;
    //const asdas = req.querasdasy.asdadas;
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

    // const slippage = req.query.slippage;
    // const maxSlippage = req.query.maxSlippage;
    // const fee = req.query.fee;

    // const { code, data } = await getOneInchSwap({
    //   buyToken,
    //   sellToken,
    //   sellAmount,
    //   fee,
    //   slippage,
    //   maxSlippage,
    //   dsaAddr,
    // });

    res.send("Swap Successfull!!");
    // return res.status(200).json({ result: "Swap Successfull" });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
}

async function oneInchV4quote(req, res) {
  try {
    const buy = req.query.buyToken;
    console.log("HERE is HOME QUOTE!");
    console.log(buy);
    console.log("Length-", buy.length);
    res.send("This is QUOTE " + buy);
  } catch (error) {
    return res.status(400).send({ error });
  }
}
module.exports = {
  oneInchv4Swap: oneInchV4Swap,
  oneInchV4quote: oneInchV4quote,
};
