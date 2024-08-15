const dbName = "sample_airbnb";
const dbCollection = "listingsAndReviews";

exports.updateListingByName = async (client, nameOfListing, updatedListing) => {
    const result = await client.db(dbName).collection(dbCollection)
        .updateOne({ name: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

exports.upsertListingByName = async (client, nameOfListing, updatedListing) => {
    const result = await client.db(dbName).collection(dbCollection)
        .updateOne(
            { name: nameOfListing },
            { $set: updatedListing },
            { upsert: true }
        );
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}

exports.updateAllListingsToHavePropertyType = async (client) => {
    const result = await client.db(dbName).collection(dbCollection)
        .updateMany({ property_type: { $exists: false } },
            { $set: { property_type: "Unknown" } });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}