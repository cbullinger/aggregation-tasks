// Task 4: Aggregate complaint count and sentiment per business and output summary

const getCollection = require('../lib/mongoClient');

async function run() {
    const businesses = await getCollection('yelp', 'businesses');

    const pipeline = [
        // TODO: $lookup to join reviews
        // TODO: $match reviews by keyword
        // TODO: $group to calculate count, avg stars, complaint ratio
        // TODO: $project risk level based on complaint ratio
        // TODO: $out or $merge to write results to a new collection
    ];

    await businesses.aggregate(pipeline).toArray(); // Forces execution
    console.log('Pipeline executed. Check target collection for output.');
}

run().catch(console.error);
