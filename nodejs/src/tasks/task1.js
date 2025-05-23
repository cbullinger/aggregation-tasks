import {getBusinessCollection} from '../config.js';

export const name = '1';
export const description = 'Find highly rated, reputable restaurants by city';

export async function run() {
    const coll = await getBusinessCollection();

    const pipeline = [

        // TODO: Create an aggregation pipeline to get reputation scores for highly rated restaurants.

        // Solution to Task 1 - Find highly rated, reputable restaurants
        // 1. Filter for restaurants with a 4.6 rating or higher and more than 500 reviews
        // 2. Calculate the reputation score as the product of stars and review_count
        // 3. Project the name, city, and reputation score fields
        // 4. Sort by reputation score in descending order

        { $match: {
                categories: "Restaurants", // ALTERNATE METHOD: can use $elemMatch or $in with array field
                // categories: { $elemMatch: { $eq: "Restaurants" } },
                // categories: { $in: ["Restaurants"] },
                stars : { $gte: 4.6 },
                review_count: { $gt: 500 }
            }},

        { $addFields: {   // ALTERNATE METHOD: can use $set instead of $addFields for the new field; subsequent syntax is the same
                // { $set: {
                reputationScore: {
                    $round:  // NOTE: Use $round to get nearest whole number
                        [{ $multiply: ['$stars', '$review_count']}, 0]
                }
            }},

        { $project: {
                _id: 0, // NOTE: must explicitly exclude the `_id` field
                name: 1,
                city: 1,
                reputationScore: 1 // NOTE: must include the new reputationScore field in the output
            }},

        { $sort: { reputationScore: -1 } } // $sort set to -1 for descending order
    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.table(results);
}
