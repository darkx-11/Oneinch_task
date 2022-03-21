import { ExecuteQuote, ExecuteSwap } from "../resolver/oneInchmulti.js";
export async function oneInchV4multiswap(req, res) {
  try {
    const { buyToken, sellToken, sellAmount, dsaAddress, chainName, slippage } =
      req.query;
    if (!buyToken)
      return res.status(400).json({ error: "buyToken-query-missing" });
    if (!sellToken)
      return res.status(400).json({ error: "sellToken-query-missing" });
    if (!sellAmount)
      return res.status(400).json({ error: "sellAmount-query-missing" });
    if (!chainName)
      return res.status(400).json({ error: "chainName-query-missing" });
    if (!dsaAddress)
      return res.status(400).json({ error: "dsaAddress-query-missing" });
    if (!slippage)
      return res.status(400).json({ error: "Slippage-query-missing" });

    let sellAmountArray = sellAmount.split(",");
    for (let i = 0; i < sellAmountArray.length; i++) {
      if (sellAmountArray[i] <= 0)
        return res.status(400).json({ error: "sellAmount-invaild" });
    }
    if (
      buyToken.split(",").length != sellToken.split(",").length ||
      buyToken.split(",").length != sellAmount.split(",").length ||
      buyToken.split(",").length != dsaAddress.split(",").length ||
      buyToken.split(",").length != chainName.split(",").length ||
      buyToken.split(",").length != slippage.split(",").length
    ) {
      return res.status(400).json({ error: "Array lengths do not match" });
    }
    ExecuteSwap(
      buyToken,
      sellToken,
      sellAmount,
      dsaAddress,
      chainName,
      slippage
    );
    res.send("Swap Successfull!!");
  } catch (err) {
    return res.status(400).send({ error: err });
  }
}

export async function oneInchV4multiquote(req, res) {
  try {
    const { buyToken, sellToken, sellAmount, chainName } = req.query;

    if (!buyToken)
      return res.status(400).json({ error: "buyToken-query-missing" });
    if (!sellToken)
      return res.status(400).json({ error: "sellToken-query-missing" });
    if (!sellAmount)
      return res.status(400).json({ error: "sellAmount-query-missing" });
    if (!chainName)
      return res.status(400).json({ error: "chainName-query-missing" });

    let sellAmountArray = sellAmount.split(",");
    for (let i = 0; i < sellAmountArray.length; i++) {
      if (sellAmountArray[i] <= 0)
        return res.status(400).json({ error: "sellAmount-invaild" });
    }
    if (
      buyToken.split(",").length != sellToken.split(",").length ||
      buyToken.split(",").length != sellAmount.split(",").length ||
      buyToken.split(",").length != chainName.split(",").length
    ) {
      return res.status(400).json({ error: "Array lengths do not match" });
    }
    ExecuteQuote(buyToken, sellToken, sellAmount, chainName);

    res.send("Quote Successfull!!");
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
}
