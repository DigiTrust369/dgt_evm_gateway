const Contract = require('web3-eth-contract');
const bluebird = require('bluebird'); // eslint-disable-line no-global-assign
const redis = require("redis");
const Web3 = require('web3')
const {redisUrl, dgtCfg, contractParams} = require("../config/vars");
let redisClient = redis.createClient(redisUrl);
bluebird.promisifyAll(redis);

//contract config 
const {setAdminToken} = require('./token.service')
const profileAbi = require("../abi/profileAbi.json");
const {provider, contractProvider} = require('../utils/provider')

const web3 = new Web3(dgtCfg.providerUrl)

Contract.setProvider(provider)

exports.createVault = async (req) =>{
    // let contract = new Contract(orderAbi, orderContractAddress);
    //set key - orderaddress 
    let deployContract = new web3.eth.Contract(profileAbi)
    // let payload = {
    //     data: orderByteCode.object,
    //     arguments: [
    //         dgtCfg.dgtTokenAddress,
    //         dgtCfg.contractOwnerAddr, //fee wallet address
    //         [req.assetAddress ,req.symbol, req.startPrice, req.endPrice, 0, 0,req.amount, req.duration], //order info
    //         dgtCfg.contractOwnerAddr, //price feed
    //     ]
    // }
    let deployTx = deployContract.deploy(payload)
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            from: dgtCfg.contractOwnerAddr,
            data: deployTx.encodeABI(),
            gasPrice: 25000000000,
            gasLimit: 8500000,
        },
        dgtCfg.contractOwnerPriv
    );
    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    );
    console.log('Contract deployed at address', createReceipt.contractAddress);
    // return createReceipt.contractAddress
    let orderInfo = {
        orderId: createReceipt.contractAddress,
        symbol: req.symbol,
        createdAt: Date.now(),
        status: 0
    }
    if(orderInfo.orderId == ''){
        return 'Error missing orderId'
    }
    let request = {
        orderContractAddress: createReceipt.contractAddress,
        owner: req.owner,
        admin: createReceipt.contractAddress,
    }
    let respSetAdmin = await setAdminToken(request)
    console.log("Resp set admin token: ", respSetAdmin.transactionHash, " -s: ", respSetAdmin.status)

    let receipt = await redisClient.zadd(req.assetAddress,{}, JSON.stringify(orderInfo));
    return receipt
}

exports.initializeVault = async(req) =>{
    let contract = new contractProvider(profileAbi, req.profileContractAddress)
    try {
        let receipt = await contract.methods.depositOrder(req.defaultAdmin,req.pauser,req.minter,req.upgrader).send(Object.assign(contractParams, {}));
        return receipt
    } catch (err) {
        return err.message
    }
}