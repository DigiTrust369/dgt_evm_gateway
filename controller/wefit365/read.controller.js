const { connectToDatabase } = require('../../service/mongoDb/connection');
const { logger } = require('../../config/logger');
const { findUserByEmail, findActivityByConditions } = require('../../service/mongoDb/read');

exports.getUserByEmail = async (req, res, next) => {
    try {
        const client = await connectToDatabase();

        let request = {
            userEmail: req.body.userEmail,
        }

        let resp = await findUserByEmail(client, request);

        if (resp) {
            res.json({
                code: 0,
                data: resp
            })
        } else {
            console.log("No user found");
            res.status(404).json({
                code: 404,
                message: "No user found"
            });
        }
    } catch (err) {
        logger.info("Get user by email error: ", err.message)
        next(err)
    }
}

exports.getActivityByEmailAndDate = async (req, res, next) => {
    try {
        const client = await connectToDatabase();

        let request = {
            userEmail: req.body.userEmail,
            activityDate: req.body.activityDate,
        }

        let resp = await findActivityByConditions(client, request);

        if (resp) {
            res.json({
                code: 0,
                data: resp
            });
        } else {
            console.log("No activity found");
            res.status(404).json({
                code: 404,
                message: "No activity found"
            });
        }
    } catch (err) {
        logger.info("Getting activity error: ", err.message)
        next(err)
    }
}