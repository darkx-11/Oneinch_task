import { ExecuteQuote } from "../resolver/oneInchmulti.js";
export async function oneInchV4multiswap(req, res) {
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
    //Call Resolver for swap loop here
    res.send("Swap Successfull!!");
  } catch (err) {
    return res.status(400).send({ error: err });
  }
}

export async function oneInchV4multiquote(req, res) {
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

    var quoteParams = {
      fromTokenAddressArray: sellToken,
      toTokenAddressArray: buyToken,
      amountArray: sellAmount,
    };
    ExecuteQuote(quoteParams);

    res.send("Quote Successfull!!");
  } catch (error) {
    return res.status(400).send({ error });
  }
}
