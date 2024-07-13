const express = require('express');
const profileController = require("../controller/profile.controller")

const profileRouter = express.Router();


profileRouter.route('/create').post(profileController.createVaultProfile);
profileRouter.route('/initialize').post(profileController.initializeVaultProfile);
profileRouter.route('/test2').post(profileController.test);
module.exports = profileRouter;
