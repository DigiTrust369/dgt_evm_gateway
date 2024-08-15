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

async function main() {
    try {
        // Connect the client to the server
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Do task

    } catch (error) {
        console.error(error);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

main().catch(console.error);