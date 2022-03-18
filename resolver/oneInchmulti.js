const fetch = require("node-fetch");
const axios = require("axios");

const chainId = 56;
const apiBaseUrl = "https://api.1inch.io/v4.0/" + chainId;
function apiRequestUrl(methodName, queryParams) {
  return (
    apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString()
  );
}
async function buildTxForQuote(quoteParams) {
  const url = apiRequestUrl("/quote", quoteParams);

  await axios
    .get(url)
    .then(async function (response) {
      console.log(response.data);
      return await response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}
async function ExecuteQuote(quoteParams) {
  await buildTxForQuote(quoteParams);
}
module.exports = ExecuteQuote;
