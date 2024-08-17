const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI;
const { insertUser } = require('../../service/mongoDb/insert')

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

exports.createNewUser = async (req, res, next) => {
    try {
        await client.connect();

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

    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}