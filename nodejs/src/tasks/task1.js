

import { getBusinessCollection } from '../config.js';

export const name = 'findHighlyRated';
export const description = 'Task 1: Find highly rated, open businesses with > 2500 reviews';

export async function run() {
    const coll = await getBusinessCollection();
    const pipeline = [
        // TODO: Create aggregation to find open businesses with >= 4.5 stars and > 2500 reviews
        // TODO: Project the following fields in the output: name, city, stars, review_count
        // TODO: Sort the results by review_count in descending order
    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log('\nTask 1 Results:');
    console.table(results);
}