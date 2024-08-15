const cron = require('node-cron');
const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGODB_URI = "mongodb+srv://danghlam:password@mydemoapp.o8r47.mongodb.net/?retryWrites=true&w=majority&appName=MyDemoApp";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

cron.schedule('*/10 * * * * *', async function () {
    console.log("Running a task every 10 seconds");

    try {
        // Read data logic

    } catch (err) {
        console.log(err.message)
    }

    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});