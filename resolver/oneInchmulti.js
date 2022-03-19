import axios from "axios";
export async function ExecuteQuote(quoteParams) {
  for (var i = 0; i < quoteParams.fromTokenAddressArray.length; i++) {
    var singlequoteParams = {
      fromTokenAddress: quoteParams.fromTokenAddressArray[i],
      toTokenAddress: quoteParams.toTokenAddressArray[i],
      amount: quoteParams.amountArray[i],
    };
    const chainId = 56; //For Binance smart chain
    const apiBaseUrl = "https://api.1inch.io/v4.0/" + chainId;
    const url =
      apiBaseUrl +
      "/quote" +
      "?" +
      new URLSearchParams(singlequoteParams).toString();
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
}
