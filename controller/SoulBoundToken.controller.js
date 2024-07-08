const { logger } = require('../config/logger');
const {registerBySigAndAirdrop} = require('../service/SoulBoundToken.service')

exports.withDrawAsset = async(req, res, next) =>{
    try {
        let request = {
            sender: req.body.sender,
            amount: req.body.amount
        }
        let resp = await withDraw(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Withdraw challenge error: ", err.message)
        next(err)
    }
}

exports.registerBySigAndAirdroptoUser = async(req, res, next)=>{
    try {
        let request = {
            sender: req.body.sender,
            stringContributorsMerkleRoot: req.body.stringContributorsMerkleRoot,
            addressContributorsMerkleRoot: req.body.addressContributorsMerkleRoot,
            isSignatureRequired: req.body.isSignatureRequired,
            isAllowlistRequired: req.body.isAllowlistRequired,
            totalClaimCount: req.body.totalClaimCount,
            headline: req.body.headline,
            description: req.body.description,
            links: req.body.links,
            communityUniqId: req.body.communityUniqId,
            customAttributes: req.body.customAttributes,
            v: req.body.v,
            r: req.body.r,
            s: req.body.s
        }
        let resp = await registerBySigAndAirdrop(request)
        res.json({
            code: 0,
            data: resp
        })
    }
    catch(err){
        logger.info("Register error: ", err.message)
        next(err)
    }
}
