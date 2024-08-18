const { insertUser, insertActivity } = require('../../service/mongoDb/insert');
const { connectToDatabase } = require('../../service/mongoDb/connection');
const { logger } = require('../../config/logger');

exports.createNewUser = async (req, res, next) => {
    try {
        const client = await connectToDatabase();

        let request = {
            userEmail: req.body.userEmail,
            createdAt: req.body.createdAt,
            balance: 0,
            totalDistance: 0,
            totalTime: 0,
            typeofMember: 'beginner',
            maxSteps: 10000,
        };
        let resp = await insertUser(client, request);

        res.json({
            code: 0,
            data: resp
        });
    } catch (err) {
        logger.info("Create user error: ", err.message);
        next(err);
    }
}

exports.createNewActivity = async (req, res, next) => {
    try {
        const client = await connectToDatabase();

        let request = {
            userEmail: req.body.userEmail,
            activityDate: req.body.activityDate,
            startedAt: req.body.startedAt,
            typeOfActivity: req.body.typeOfActivity,
            isFinished: false,
            isClaimed: false,
        };
        let resp = await insertActivity(client, request);

        res.json({
            code: 0,
            data: resp
        });
    } catch (err) {
        logger.info("Create user error: ", err.message);
        next(err);
    }
}