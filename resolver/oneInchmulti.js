import BigNumber from "bignumber.js";
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
  _network = "polygon",
  _slippage = 1
) {
  let responseArray = [];
  let buyTokenArray = _buyToken.split(",");
  let sellTokenArray = _sellToken.split(",");
  let sellAmountArray = _sellAmount.split(",");
  for (let i = 0; i < buyTokenArray.length; i++) {
    let singleswapParams = {
      fromTokenAddress: sellTokenArray[i],
      toTokenAddress: buyTokenArray[i],
      amount: sellAmountArray[i],
      fromAddress: _dsaAddress,
      slippage: _slippage,
      //disableEstimate: true,
    };
    const chainId = ChainMap[_network]; //Selecting Chain Id from Mapping based on chain Name
    const url = "https://api.1inch.io/v4.0/" + chainId + "/swap";

    const response = await axios
      .get(url, { params: singleswapParams })
      .then(async function (response) {
        return {
          code: 200,
          data: {
            sellToken: {
              ...response.data.fromToken,
              decimals: response.data.fromToken.decimals.toString(),
            },
            buyToken: {
              ...response.data.toToken,
              decimals: response.data.toToken.decimals.toString(),
            },
            sellTokenAmount: response.data.fromTokenAmount,
            buyTokenAmount: response.data.toTokenAmount,
            unitAmt: caculateUnitAmt(
              response.data.toTokenAmount,
              response.data.fromTokenAmount,
              response.data.toToken.decimals,
              response.data.fromToken.decimals,
              _slippage
            ),
            calldata: response.data.tx.data,
            gas: response.data.tx.gas.toString(),
            gasPrice: response.data.tx.gasPrice,
            value: response.data.tx.value,
          },
        };
      })
      .catch(function (error) {
        console.log(error.response.data);
        return error.response.data;
      });
    responseArray.push(response);
  }
  return responseArray;
}

export async function ExecuteQuote(
  _buyToken,
  _sellToken,
  _sellAmount,
  _network = "polygon",
  _slippage = 1
) {
  let responseArray = [];
  let buyTokenArray = _buyToken.split(",");
  let sellTokenArray = _sellToken.split(",");
  let sellAmountArray = _sellAmount.split(",");
  for (let i = 0; i < buyTokenArray.length; i++) {
    let singlequoteParams = {
      fromTokenAddress: sellTokenArray[i],
      toTokenAddress: buyTokenArray[i],
      amount: sellAmountArray[i],
    };
    const chainId = ChainMap[_network]; //Selecting Chain Id from Mapping based on chain Name
    const url = "https://api.1inch.io/v4.0/" + chainId + "/quote";

    const response = await axios
      .get(url, { params: singlequoteParams })
      .then(async function (response) {
        return {
          code: 200,
          data: {
            sellToken: {
              ...response.data.fromToken,
              decimals: response.data.fromToken.decimals.toString(),
            },
            buyToken: {
              ...response.data.toToken,
              decimals: response.data.toToken.decimals.toString(),
            },
            sellTokenAmount: response.data.fromTokenAmount,
            buyTokenAmount: response.data.toTokenAmount,
            EstimatedGas: response.data.estimatedGas,
            unitAmt: caculateUnitAmt(
              response.data.toTokenAmount,
              response.data.fromTokenAmount,
              response.data.toToken.decimals,
              response.data.fromToken.decimals,
              _slippage
            ),
            protocols: response.data.protocols,
          },
        };
      })
      .catch(function (error) {
        return error.response.data;
      });
    responseArray.push(response);
  }
  return responseArray;
}

function caculateUnitAmt(
  buyAmount,
  sellAmount,
  buyDecimal,
  sellDecimal,
  maxSlippage
) {
  let unitAmt = new BigNumber(buyAmount)
    .dividedBy(10 ** buyDecimal)
    .dividedBy(new BigNumber(sellAmount).dividedBy(10 ** sellDecimal));
  unitAmt = unitAmt.multipliedBy((100 - maxSlippage) / 100);
  unitAmt = unitAmt.multipliedBy(1e18).toFixed(0);
  return unitAmt;
}
