import { getBusinessCollection } from '../config.js';

export const name = 'waitTimeReviews';
export const description = 'Task 2: Find which users review highly rated businesses';

export async function run() {
    const coll = await getBusinessCollection();

    const pipeline = [
        // Task 1 filter to open, highly rated businesses
        {
            $match: {
                is_open:      1,
                stars:        { $gte: 4.5 },
                review_count: { $gt: 10 }
            }
        },
        // Join reviews
        {
            $lookup: {
                from:         'review',
                localField:   'business_id',
                foreignField: 'business_id',
                as:           'review'
            }
        },
        { $unwind: '$review' },
        // Count regex matches per review
        {
            $match: {
                "reviews.text": {
                    $regex: /(wait(ed|ing)?|slow service)/i
                }
            }
        },
        // Aggregate per business
        {
            $group: {
                _id:              '$business_id',
                name:             { $first: '$name' },
                city:             { $first: '$city' },
         //       reputationScore:  { $first: '$reputationScore' },
               // totalWaitMentions:{ $sum: '$waitMentions' },
           //     totalReviews:     { $sum: 1 }
            }
        },
        // // Compute average mentions per review
        // {
        //     $addFields: {
        //         avgWaitsPerReview: { $divide: ['$totalWaitMentions', '$totalReviews'] }
        //     }
        // },
        {
            $project: {
                _id:                0,
                name:               1,
                city:               1,
         //       reputationScore:    1,
                totalReviews:       1,
            //    totalWaitMentions:  1,
          //      avgWaitsPerReview:  1
            }
        },
        // Sort by average mentions
    //    { $sort: { avgWaitsPerReview: -1 } }
    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log('\nTask 2 Results:');
    console.table(results);
}
