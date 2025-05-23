import { getBusinessCollection } from '../config.js';

export const name = '2';
export const description = 'Find businesses with an average rating of less than 2 stars';

export async function run() {
    const coll = await getBusinessCollection();
    // Solution to Task 2 - Find businesses with an average rating of less than 2 stars
    const pipeline = [
        {
            $lookup: {
                from: 'review', // NOTE: must match collection name exactly
                localField: 'business_id',
                foreignField: 'business_id',
                as: 'reviews' // NOTE: user-defined but must match exactly in subsequent pipeline stages (e.g. $unwind)
            }
        },
        { $unwind: '$reviews' },
        {
            $group: {
                _id: '$name', // NOTE: group by business name as the unique id to return only one row per business
                avgReviewStars: { $avg: '$reviews.stars' }}},

        {
            $project: {
                _id: 0,
                businessName: '$_id', // NOTE: rename the grouped _id to businessName
                avgReviewStars: 1,
            }
        },
        {
            $match: {
                avgReviewStars: { $lt: 2.0 }
            }
        },
        {
            $sort: {avgReviewStars: -1}

        }
    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log('\nTask 2 Results:');
    console.table(results);
}
