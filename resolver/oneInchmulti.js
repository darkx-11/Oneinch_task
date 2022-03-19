import axios from "axios";
export async function ExecuteQuote(quoteParams) {
  for (let i = 0; i < quoteParams.fromTokenAddressArray.length; i++) {
    let singlequoteParams = {
      fromTokenAddress: quoteParams.fromTokenAddressArray[i],
      toTokenAddress: quoteParams.toTokenAddressArray[i],
      amount: quoteParams.amountArray[i],
    };
    const chainId = 56; //For Binance smart chain
    const apiBaseUrl = "https://api.1inch.io/v4.0/" + chainId;
    const url = apiBaseUrl + "/quote";
    await axios
      .get(url, { params: singlequoteParams })
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
