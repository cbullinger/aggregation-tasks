// Task 3: Lookup reviews for selected businesses and filter for wait-related keywords

import { getBusinessCollection } from '../config.js';

export const name = 'lookupReviews';
export const description = 'Task 3: TODO';

export async function run() {
    const coll = await getBusinessCollection();
    //const coll = await getReviewCollection();

    // results from task 2
    const selectedBusinessIds = [
        'business_id_1',
        'business_id_2',
        'business_id_3',
        // Add more business_ids as needed
    ];


    const pipeline = [
        // TODO: Filter or use hardcoded business_ids from Task 2
        // TODO: $lookup to join with 'reviews'
        // TODO: Filter reviews where text matches "wait", "slow service", etc.
        // TODO: Project business name, review text, stars
    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log('\nTask 3 Results:');
    console.table(results);
}
