import { getBusinessCollection } from '../config.js';

export const name = '2';
export const description = 'Join reviews and filter for wait-related complaints';

export async function run() {
    const coll = await getBusinessCollection();
    // Solution to Task 2 - Join reviews and filter for positive reviews
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
       //  {
       //      $match: {
       //          'reviews.text': {
       //              $regex: /(wait|slow|delay)/i // NOTE: regex /i to match case-insensitive
       //          }
       //      }
       // },
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
