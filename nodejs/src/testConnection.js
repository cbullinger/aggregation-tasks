import {getBusinessCollection, closeConnection} from './config.js';

async function runAggregation() {
    let coll;
    try {
        coll = await getBusinessCollection();
        console.log('Successfully connected to Atlas');


        const pipeline = [
            {$group: {_id: '$city', count: { $sum: 1 }}}, {$sort: { count: -1 }}, {$limit: 5}
        ];

        const topTen = await coll.aggregate(pipeline).toArray();
        console.log('Top 5 Cities by Business Count:');
        topTen.forEach(({ _id, count }) =>
            console.log(`  ${_id}: ${count}`)
        );

} catch (err) {
        console.error('Error:', err);
    process.exitCode = 1;
    } finally {
        await closeConnection();
        console.log('Connection closed');
    }
}

runAggregation();
