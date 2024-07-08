const express = require('express');
const soulBoundTokenController = require('../controller/SoulBoundToken.controller')

const challengeRouter = express.Router();

challengeRouter.route('/registerBySigAndAirdroptoUser').post(soulBoundTokenController.registerBySigAndAirdroptoUser)
// challengeRouter.route('/').get(challengeController.getAssetByAddress)

module.exports = challengeRouter;
