const fetch = require("node-fetch");
const axios = require("axios");

const chainId = 56;
const web3RpcUrl = "https://bsc-dataseed.binance.org";

// var quoteParams = {
//   fromTokenAddress: "0x111111111117dc0aa78b770fa6a738034120c302", // 1INCH
//   toTokenAddress: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3", // DAI
//   amount: "100000000000000000",
// };
const apiBaseUrl = "https://api.1inch.io/v4.0/" + chainId;
function apiRequestUrl(methodName, queryParams) {
  return (
    apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString()
  );
}
async function buildTxForQuote(quoteParams) {
  const url = apiRequestUrl("/quote", quoteParams);
  //console.log(url);
  //console.log(await fetch(url));

  await axios
    .get(url)
    .then(async function (response) {
      // handle success
      console.log(response.data);
      return await response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return error;
    });

  //   return await fetch(url)
  //     .then((res) => res.json())
  //     .then((res) => res.tx);
}
async function ExecuteQuote(quoteParams) {
  await buildTxForQuote(quoteParams);
}
module.exports = ExecuteQuote;
