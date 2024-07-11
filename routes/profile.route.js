const express = require('express');
const profileController = require("../controller/profile.controller")

const profileRouter = express.Router();


profileRouter.route('/create').post(profileController.createVaultProfile);
profileRouter.route('/initialize').get(profileController.initializeVaultProfile);
module.exports = profileRouter;
