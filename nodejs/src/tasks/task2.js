import { getBusinessCollection } from '../config.js';

export const name = '2';
export const description = 'Join reviews and filter for positive reviews';

export async function run() {
    const coll = await getBusinessCollection();
    const pipeline = [
    // TODO: Create an aggregation pipeline to find positive reviews
    //  - Find businesses with a `stars` rating of 4.0 or higher
    //  - Join the `business` and `review` collections by their `business_id` fields using `$lookup`
    //  - Filter for positive reviews using `$match` (e.g. text includes "good", "great", "loved", etc.)
    //  - Use $project to return only the `businessName`, the `text` the review
    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log('\nTask 2 Results:');
    console.table(results);
}
