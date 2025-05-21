import { getBusinessCollection } from '../config.js';

export const name = '3';
export const description = 'Group complaints and compute a riskLevel';

export async function run() {
    const coll = await getBusinessCollection();

    // Solution to Task 3 - Group complaints and compute a risk level
    const pipeline = [
        {
            $lookup: {
                from: 'review',
                localField: 'business_id',
                foreignField: 'business_id',
                as: 'reviews'
            }
        },
        { $unwind: '$reviews' },
        {
            $match: {
                'reviews.text': {
                    $regex: /(wait|slow service|waited forever)/i
                }
            }
        },
        // group by business, collect stats
        {
            $group: {
                _id: '$business_id',
                name: { $first: '$name' },
                totalComplaints: { $sum: 1 },
                totalReviews: { $first: '$review_count' }
            }
        },
        // compute complaint_ratio & riskLevel
        {
            $addFields: {
                complaintRatio: {
                    $divide: ['$totalComplaints', '$totalReviews']
                },
                riskLevel: {
                    $switch: {
                        branches: [
                            { case: { $gt: [{ $divide: ['$totalComplaints', '$totalReviews'] }, 0.3] }, then: 'high' },
                            {
                                case: {
                                    $and: [
                                        { $gte: [{ $divide: ['$totalComplaints', '$totalReviews'] }, 0.1] },
                                        { $lte: [{ $divide: ['$totalComplaints', '$totalReviews'] }, 0.3] }
                                    ]
                                },
                                then: 'medium'
                            }
                        ],
                        default: 'low'
                    }
                }
            }
        },
        { $match: { complaintRatio: { $gt: 0.3 } } }, // Filter for only high risk businesses
        {
            $project: {
                _id: 0,
                businessName: '$name',
                complaintRatio: 1,
                riskLevel: 1
            }
        },

        { $sort: { complaintRatio: -1 } }
    ];
    const results = await coll.aggregate(pipeline).toArray();
    console.log('\nTask 3 Results:');
    console.table(results);
}
