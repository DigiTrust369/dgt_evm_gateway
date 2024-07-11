const {
    createVault,
    initializeVault
} = require('../service/profile.service')
const { logger } = require('../config/logger');

exports.createVaultProfile = async(req, res, next) =>{
    try {
        let resp = await createVault()
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Create vault error: ", err.message)
        next(err)
    }
}

exports.initializeVaultProfile = async(req, res, next) =>{
    try {
        let request = {
            defaultAdmin: req.body.defaultAdmin,
            pauser: req.body.pauser,
            minter: req.body.minter,
            upgrader: req.body.upgrader,
            profileContractAddress: req.body.profileContractAddress
        }
        let resp = await initializeVault(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Set price order error: ", err.message)
        next(err)
    }
}