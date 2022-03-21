import axios from "axios";
const ChainMap = {
  Arbitrum: 42161,
  arb: 42161,
  Avalanche: 43114,
  avax: 43114,
  "Binance Smart Chain": 56,
  bsc: 56,
  Ethereum: 1,
  eth: 1,
  "Gnosis Chain": 0x64,
  gnosis: 0x64,
  "Optimistic Ethereum": 10,
  optimism: 10,
  Polygon: 137,
  polygon: 137,
};
export async function ExecuteSwap(
  _buyToken,
  _sellToken,
  _sellAmount,
  _dsaAddress,
  _chainName,
  _slippage
) {
  let buyTokenArray = _buyToken.split(",");
  let sellTokenArray = _sellToken.split(",");
  let sellAmountArray = _sellAmount.split(",");
  let dsaAddressArray = _dsaAddress.split(",");
  let chainNameArray = _chainName.split(",");
  let slippageArray = _slippage.split(",");
  for (let i = 0; i < buyTokenArray.length; i++) {
    let singleswapParams = {
      fromTokenAddress: sellTokenArray[i],
      toTokenAddress: buyTokenArray[i],
      amount: sellAmountArray[i],
      fromAddress: dsaAddressArray[i],
      slippage: slippageArray[i],
    };
    const chainId = ChainMap[chainNameArray[i]]; //Selecting Chain Id from Mapping based on chain Name
    console.log(chainId);
    const apiBaseUrl = "https://api.1inch.io/v4.0/" + chainId;
    const url = apiBaseUrl + "/swap";

    await axios
      .get(url, { params: singleswapParams })
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

export async function ExecuteQuote(
  _buyToken,
  _sellToken,
  _sellAmount,
  _chainName
) {
  let buyTokenArray = _buyToken.split(",");
  let sellTokenArray = _sellToken.split(",");
  let sellAmountArray = _sellAmount.split(",");
  let chainNameArray = _chainName.split(",");
  for (let i = 0; i < buyTokenArray.length; i++) {
    let singlequoteParams = {
      fromTokenAddress: sellTokenArray[i],
      toTokenAddress: buyTokenArray[i],
      amount: sellAmountArray[i],
    };
    const chainId = ChainMap[chainNameArray[i]]; //Selecting Chain Id from Mapping based on chain Name
    console.log(chainId);
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
