const dbName = "wefit365";

exports.insertActivity = async (client, newActivity) => {
    const result = await client.db(dbName).collection("activities").insertOne(newActivity);
    console.log(`New activity created with the following id: ${result.insertedId}`);
}

exports.insertMultipleActivities = async (client, newActivities) => {
    const result = await client.db(dbName).collection("activities").insertMany(newActivities);

    console.log(`${result.insertedCount} new activity(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

exports.insertUser = async (client, newUser) => {
    const result = await client.db(dbName).collection("users").insertOne(newUser);
    // example result = {
    //     acknowledged: true,
    //     insertedId: new ObjectId('66c02cd755ce9f3fddff81a4')
    // }
    console.log(`New user created with the following id: ${result.insertedId}`);
}

exports.insertMultipleUsers = async (client, newUsers) => {
    const result = await client.db(dbName).collection("users").insertMany(newUsers);

    console.log(`${result.insertedCount} new user(s) created with the following id(s):`);
    console.log(result.insertedIds);
}