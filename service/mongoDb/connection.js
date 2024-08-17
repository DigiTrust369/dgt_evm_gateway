const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI;
const { insertUser } = require('./insert');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function main() {
    try {
        // Connect the client to the server
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Do task
        let newUser = {
            email: 'danghlambk14@gmail.com',
            balance: 0,
            createdAt: new Date(),
            typeofMember: 'beginner',
            maxSteps: 10000
        }

        const result = await insertUser(client, newUser);

    } catch (error) {
        console.error(error);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

main().catch(console.error);