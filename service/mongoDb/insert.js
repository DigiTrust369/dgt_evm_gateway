const dbName = "sample_mflix";
const dbCollection = "movies";

exports.createListing = async (client, newListing) => {
    const result = await client.db(dbName).collection(dbCollection).insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

exports.createMultipleListings = async (client, newListings) => {
    const result = await client.db(dbName).collection(dbCollection).insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}