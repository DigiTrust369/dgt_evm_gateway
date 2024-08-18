const dbName = "wefit365";

exports.findUserByEmail = async (client, req) => {
    const collection = client.db(dbName).collection('users');

    try {
        const result = await collection.findOne(req);
        if (result) {
            console.log(`Found a user in the collection with the email '${req.userEmail}':`);
            console.log(result);
            return result;
        } else {
            console.log(`No users found with the email '${req.userEmail}'`);
            return null;
        }
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
}

exports.findActivityByConditions = async (client, req) => {
    const collection = client.db(dbName).collection('activities');

    try {
        const result = await collection.findOne(req);
        if (result) {
            console.log(`Found a activity`);
            return result;
        } else {
            console.log(`No activity found`);
            return null;
        }
    } catch (error) {
        console.error("Error getting activity:", error);
        throw error;
    }
}

exports.findActivitiesByEmailAndDate = async (client, userEmail, date) => {
    const cursor = client.db(dbName).collection("activities").find({ email: userEmail, date: date });
    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`Found activity(s) with email '${userEmail}' and date '${date}':`);
        results.forEach((result, i) => {
            date = new Date(result.date).toDateString();

            console.log();
            console.log(`${i + 1}. Type: ${result.typeOf}`);
            console.log(`   step: ${result.step}`);
            console.log(`   status: ${result.status}`);

        });
    } else {
        console.log(`No activities found with email '${userEmail}' and date '${date}'`);
    }
}