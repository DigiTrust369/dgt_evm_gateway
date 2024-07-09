const Contract = require('web3-eth-contract');
const bluebird = require('bluebird'); // eslint-disable-line no-global-assign
const HDWalletProvider = require("@truffle/hdwallet-provider");
const redis = require("redis");
const {dgtCfg} = require("../config/vars");
bluebird.promisifyAll(redis);
const {setAdminToken} = require('./token.service')
const Web3 = require('web3')
const web3 = new Web3(dgtCfg.providerUrl)


//contract config 
const {getNonce} = require('./priceFeed_service')
const gasPrice = '5000000000'
const maxErc20GasLimit = 500000
const challengeAbi = require("../abi/challengeAbi.json");
const assetAbi = require("../abi/assetAbi.json");
const SoulBoundTokenAbi = require("../abi/SoulBoundTokenAbi.json");

const provider = new HDWalletProvider({ 
    privateKeys: [dgtCfg.contractOwnerPriv], 
    providerOrUrl: dgtCfg.providerUrl,
    pollingInterval: 8000
});

const contractParams = {
    from    : dgtCfg.contractOwnerAddr,
    gasPrice: 25000000000,
    gasLimit: 8500000,
};

function ContributorMerkleRoots(stringContributorsMerkleRoot, addressContributorsMerkleRoot) {
    this.stringContributorsMerkleRoot = stringContributorsMerkleRoot;
    this.addressContributorsMerkleRoot = addressContributorsMerkleRoot;
}

function ClaimabilityAttributes(isSignatureRequired,isAllowlistRequired,totalClaimCount,expirationTimestamp){
    this.isSignatureRequired = isSignatureRequired;
    this.isAllowlistRequired = isAllowlistRequired;
    this.totalClaimCount = totalClaimCount;
    this.expirationTimestamp = expirationTimestamp;
}

function MetaData(headline,description,startDateTimestamp,endDateTimestamp,links,communityUniqId,customAttributes,contributorMerkleRoots,claimabilityAttributes){
    this.headline = headline;
    this.description = description;
    this.startDateTimestamp = startDateTimestamp;
    this.endDateTimestamp = endDateTimestamp;
    this.links = links;
    this.communityUniqId = communityUniqId;
    this.customAttributes = customAttributes;
    this.contributorMerkleRoots = contributorMerkleRoots;
    this.claimabilityAttributes = claimabilityAttributes;
}

Contract.setProvider(provider)

exports.registerBySigAndAirdrop = async(req) =>{
    let newContributorMerkleRoots = new ContributorMerkleRoots(req.stringContributorsMerkleRoot,req.addressContributorsMerkleRoot);
    let newClaimabilityAttributes = new ClaimabilityAttributes(req.isSignatureRequired,req.isAllowlistRequired,req.totalClaimCount,Date.now());
    let newMetaData = new MetaData(req.headline,req.description,Date.now(),Date.now(),req.links,req.communityUniqId,req.customAttributes,newContributorMerkleRoots,newClaimabilityAttributes);
    let contract = new Contract(SoulBoundTokenAbi, req.SoulBoundTokenAbi)
    let nonce = await getNonce(dgtCfg.contractOwnerAddr)
    try {
        let request = [
            dgtCfg.contractOwnerAddr,
            req.sender,
            newMetaData,
            req.v,
            req.r,
            req.s
        ]
        let receipt = await contract.methods.registerBySigAndAirdrop(request).send(Object.assign(contractParams, {nonce: nonce}))
        return receipt
    } catch (err) {
        return err.message
    }
}