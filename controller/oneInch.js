import { ExecuteQuote, ExecuteSwap } from "../resolver/oneInchmulti.js";

export async function oneInchV4multiswap(req, res) {
  try {
    const { buyToken, sellToken, sellAmount, dsaAddress, network, slippage } =
      req.query;
    if (!buyToken)
      return res.status(400).json({ error: "buyToken-query-missing" });
    if (!sellToken)
      return res.status(400).json({ error: "sellToken-query-missing" });
    if (!sellAmount)
      return res.status(400).json({ error: "sellAmount-query-missing" });
    if (!dsaAddress)
      return res.status(400).json({ error: "dsaAddress-query-missing" });

    let sellAmountArray = sellAmount.split(",");
    for (let i = 0; i < sellAmountArray.length; i++) {
      if (sellAmountArray[i] <= 0)
        return res.status(400).json({ error: "sellAmount-invaild" });
    }
    if (
      buyToken.split(",").length != sellToken.split(",").length ||
      buyToken.split(",").length != sellAmount.split(",").length
    ) {
      return res.status(400).json({ error: "Array lengths do not match" });
    }
    let response = await ExecuteSwap(
      buyToken,
      sellToken,
      sellAmount,
      dsaAddress,
      network,
      slippage
    );
    res.send(response);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
}

export async function oneInchV4multiquote(req, res) {
  try {
    const { buyToken, sellToken, sellAmount, network } = req.query;

    if (!buyToken)
      return res.status(400).json({ error: "buyToken-query-missing" });
    if (!sellToken)
      return res.status(400).json({ error: "sellToken-query-missing" });
    if (!sellAmount)
      return res.status(400).json({ error: "sellAmount-query-missing" });

    let sellAmountArray = sellAmount.split(",");
    for (let i = 0; i < sellAmountArray.length; i++) {
      if (sellAmountArray[i] <= 0)
        return res.status(400).json({ error: "sellAmount-invaild" });
    }
    if (
      buyToken.split(",").length != sellToken.split(",").length ||
      buyToken.split(",").length != sellAmount.split(",").length
    ) {
      return res.status(400).json({ error: "Array lengths do not match" });
    }
    let response = await ExecuteQuote(buyToken, sellToken, sellAmount, network);
    res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
}
