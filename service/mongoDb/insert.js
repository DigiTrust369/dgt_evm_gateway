const dbName = "wefit365";

exports.insertActivity = async (client, newActivity) => {
    const collection = client.db(dbName).collection("activities");
    try {
        const result = await collection.insertOne(newActivity);
        return result;
    } catch (error) {
        console.error("Error creating activity:", error);
        throw error;
    }
}

exports.insertMultipleActivities = async (client, newActivities) => {
    const result = await client.db(dbName).collection("activities").insertMany(newActivities);

    console.log(`${result.insertedCount} new activity(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

exports.insertUser = async (client, userData) => {
    const collection = client.db(dbName).collection("users");
    try {
        const result = await collection.insertOne(userData);
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

exports.insertMultipleUsers = async (client, newUsers) => {
    const result = await client.db(dbName).collection("users").insertMany(newUsers);

    console.log(`${result.insertedCount} new user(s) created with the following id(s):`);
    console.log(result.insertedIds);
}