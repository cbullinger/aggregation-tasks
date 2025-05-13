import {getBusinessCollection} from '../config.js';

export const name = '1';
export const description = 'Find highly rated, reputable restaurants by city';

export async function run() {
    const coll = await getBusinessCollection();

    const pipeline = [
        // TODO: Create an aggregation pipeline to get reputation scores for highly rated restaurants.
        //
        //  - Highly rated restaurants are businesses that meet the following criteria:
        //    - defined as a restaurant (`categories` array must include 'Restaurants')
        //    - have a 4.6 rating or higher (`stars`) AND more than 500 reviews (`review_count`)
        //  - The `reputationScore` field is calculated as the product of `stars` and `review_count`, rounded to the nearest whole number (integer)
        //
        // TODO: Use $project to return only the `name`, `city`, and `reputationScore` fields, sorted by `reputationScore`
    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.table(results);
}
