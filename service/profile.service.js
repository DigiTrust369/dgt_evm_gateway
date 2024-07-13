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
const profileByteCode = require("../abi/profileByteCode.json");
const {provider, contractProvider} = require('../utils/provider')

const web3 = new Web3(dgtCfg.providerUrl)

Contract.setProvider(provider)

exports.createVault = async (req) =>{
    let deployContract = new web3.eth.Contract(profileAbi)
    let payload = {
        data: profileByteCode.object,
    }
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
    return createReceipt.contractAddress
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

exports.test = async() =>{
    return "Hello, it works"
}