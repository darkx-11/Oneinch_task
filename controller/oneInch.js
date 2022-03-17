async function oneInchV4Swap(req, res) {
  try {
    const buy = req.query.buyToken;
    console.log("HERE is HOME SWAP!");
    console.log(buy);
    console.log("Length-", buy.length);

    res.send("This is SWAP " + buy);
  } catch (error) {
    return res.status(400).send({ error: error.message });
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
