import { getBusinessCollection, closeConnection } from './config.js';

async function runAggregation() {
    let coll;
    try {
        coll = await getBusinessCollection();
        console.log('Connected to businesses collection');

        // Example aggregation: count how many restaurants per city
        const pipeline = [
            { $match: {'stars': {$gte: 4.5}}},
            { $group: { _id: '$city', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ];

        const topCities = await coll.aggregate(pipeline).toArray();
        console.log('Businesses with 4.5+ ratings:');
        topCities.forEach(({ _id, count }) =>
            console.log(`  ${_id}: ${count}`)
        );
    } catch (err) {
        console.error('Aggregation failed:', err);
        process.exitCode = 1;
    } finally {
        await closeConnection();
        console.log('Connection closed');
    }
}

runAggregation();
