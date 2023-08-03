const path = require('path');
const env = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
require('dotenv').config();
console.log("Provider url: ",process.env.FXCE_API_URL)


module.exports = Object.freeze({
  env                 : process.env.NODE_ENV || 'production',
  port                : process.env.PORT || 3001,
  logs                : process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  logLevels           : {
    file              : process.env.FILE_LOG_LEVEL || 'info',
    console           : process.env.CONSOLE_LOG_LEVEL || 'debug',
    sentry            : process.env.SENTRY_LOG_LEVEL || 'error'
  },
  redisUrl            : process.env.REDIS_URL || "redis://127.0.0.1:6379",
  redisTopics         : {
    priceRequest : process.env.REDIS_PRICE_REQUEST || 'binaryoption-price-request',
    priceResult  : process.env.REDIS_PRICE_RESULT  || 'pblock-price-response'
  },
  sentryDsn           : process.env.SENTRY_DSN,
  fxceCfg:{
      name: 'fxce',
      network: process.env.FXCE_NETWORK || 'testnet',
      contractOwnerPriv: process.env.FXCE_CONTRACT_OWNER_PRIV || 'eedddc0cdc167430de9383d213a9b53c67aefd61bf3c277e3dbe01ee206f9230',
      contractOwnerAddr: process.env.FXCE_CONTRACT_OWNER_ADDR || '0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E',
      providerUrl: process.env.FXCE_API_URL || 'https://data-seed-prebsc-2-s2.bnbchain.org:8545',
      fxceTokenAddress: process.env.FXCE_TOKEN_ADDRESS || '0x63c3A8780860EB632030c0Cfb019544Dc404E635',
      fxceWalletAddress: process.env.FXCE_WALLET_ADDRESS || '0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E',
      fxcePriceFeedAddress: process.env.FXCE_PRICE_FEED_ADDRESS || '0x1e3cfCF52Ae70f160324C9fc5a04365ab4E87ADc',
      fxceAdminAddress: process.env.FXCE_ADMIN_ADDRESS || '0x07c59A919b64924a9326BB8c44F13c755f54c645',
      fxceAdminPriv: process.env.FXCE_ADMIN_PRIV || '0f85f6dd9fdd46321dc5767304d53b073388277080a8c4d50f9295d00d41872b',
      fxceChallengeAddress: process.env.FXCE_CHALLENGE_ADDRESS || '0xdfB97438DE0c96B5d4314BA9a58807224A2431c8',
      gasPrice: process.env.FXCE_GAS_PRICE
  },
  fxcePriceURL: process.env.FXCE_PRICE_URL || "https://fxce-dbank-monitor-api.fxce-dbank-monitor-dev.vncdevs.com/hook/mt5_pricings/price?symbol=",
  contractParams:{
    from    : process.env.FXCE_CONTRACT_OWNER_ADDR || '0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E',
    gasPrice: 10000000000,
    gasLimit: 12354599
  },
  contractPriceFeedParams:{
    from: process.env.FXCE_ADMIN_ADDRESS || '0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E',
    gasPrice: parseInt(process.env.FXCE_GAS_PRICE) || 5000000000,
    gas     : parseInt(process.env.FXCE_ETH_GAS_LIMIT) || 500000
  }
});
