import { getBusinessCollection } from '../config.js';

export const name = 'assessRisk';
export const description = 'Task 3: Find which users review highly rated businesses';

export async function run() {
    const coll = await getBusinessCollection();

    const pipeline = [
        [
            {
                $match: {
                    is_open: 1,
                    stars: { $gte: 4.5 },
                    review_count: { $gte: 10 }
                }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "business_id",
                    foreignField: "business_id",
                    as: "reviews"
                }
            },
            { $unwind: "$reviews" },
            {
                $match: {
                    "reviews.text": {
                        $regex: /(wait(ed|ing)?|slow service)/i
                    }
                }
            },
            {
                $group: {
                    _id: "$business_id",
                    business_name: { $first: "$name" },
                    complaint_count: { $sum: 1 },
                    avg_review_stars: { $avg: "$reviews.stars" },
                    total_review_count: { $first: "$review_count" }
                }
            },
            {
                $addFields: {
                    complaint_ratio: {
                        $divide: ["$complaint_count", "$total_review_count"]
                    },
                    riskLevel: {
                        $cond: [
                            { $gt: [{ $divide: ["$complaint_count", "$total_review_count"] }, 0.3] },
                            "high",
                            {
                                $cond: [
                                    { $gt: [{ $divide: ["$complaint_count", "$total_review_count"] }, 0.1] },
                                    "medium",
                                    "low"
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    business_name: 1,
                    complaint_count: 1,
                    avg_review_stars: 1,
                    complaint_ratio: 1,
                    riskLevel: 1
                }
            },
            {
                $out: "business_complaint_risk"
            }
        ]

        ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log('\nTask 2 Results:');
    console.table(results);
}
