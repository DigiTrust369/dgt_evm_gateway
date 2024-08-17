const { insertUser } = require('../../service/mongoDb/insert')

exports.createNewUser = async (req, res, next) => {
    try {
        let request = {
            userEmail: req.body.userEmail,
            createdAt: req.body.createdAt,
            balance: 0,
            typeofMember: 'beginner',
            maxSteps: 10000
        }
        let resp = await insertUser(request);

        res.json({
            code: 0,
            data: resp
        })
        /* response format
        {
            acknowledged: true, // success
            insertedId: new ObjectId('66c02cd755ce9f3fddff81a4')
        }
        */
    } catch (err) {
        logger.info("Create challenge error: ", err.message);
        next(err)
    }
}