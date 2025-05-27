import {getReviewCollection} from '../config.js';

export const name = '3';
export const description = 'Find medical businesses with poor customer experience';

export async function run() {
    const revColl = await getReviewCollection(); // NOTE: connects to the 'review' collection

    const pipeline = [

        // TODO: Create an aggregation pipeline to find businesses in the Health & Medical category with poor customer experience'

        // Solution to Task 3 - Find medical businesses with poor customer experience
        // 1. Group reviews by 'business_id' to get 'totalReviews' & 'oneStarReviews' for each business
        {
            $group: {
                _id:            "$business_id",
                totalReviews:   { $sum: 1 }, // Count total reviews for each business
                oneStarReviews: {  // NOTE: Use $cond to conditionally sum one-star reviews
                    $sum: {
                        $cond: [{ $eq: ["$stars", 1] }, 1, 0]
                    }
                }
            }
        },
        // 2. Get the proportion of one-star reviews out of the total reviews with a new field:
        //    'oneStarRatio' calculated as 'oneStarReviews'/'totalReviews'
        {
            $addFields: {
                oneStarRatio: {
                    $cond: [ // NOTE: Use $cond to handle division by zero
                        { $eq: ["$totalReviews", 0] }, 0,
                        { $divide: ["$oneStarReviews", "$totalReviews"] }
                    ]
                }
            }
        },

        // 3. Correlate the oneStarRatio to a new field: `customerExperience`
        //    and bucket into levels based on ratio
        //    - Excellent ≤ 2% one-star reviews
        //    - Good > 2% and ≤ 10%
        //    - Fair > 10% and ≤ 25%
        //    - Poor > 25% (default)
        {
            $addFields: {
                customerExperience: {
                    $switch: { // NOTE: Use $switch create conditional branches
                        branches: [
                            // Excellent ≤ 2% one-star reviews
                            {
                                case: { $lte: ["$oneStarRatio", 0.05] },
                                then: "Excellent"
                            },
                            // Good > 2% and ≤ 10%
                            {
                                case: { $lte: ["$oneStarRatio", 0.15] },
                                then: "Good"
                            },
                            // Fair > 10% and ≤ 25%
                            {
                                case: { $lte: ["$oneStarRatio", 0.25] },
                                then: "Fair"
                            }
                        ],
                        // Poor > 25%
                        default: "Poor"
                    }
                    // ALTERNATE METHOD: can use $cond instead of $switch
                }
            }
        },

        // 4. Join with 'business' collection by 'business_id' to get the name
        {
            $lookup: {
                from:         "business",
                localField:   "_id", // NOTE: 'business_id' is '_id' from previous $group stage
                foreignField: "business_id",
                as:           "biz"
            }
        },

        // Unwind the 'biz' array to flatten the results
        { $unwind: "$biz" },

        // Filter for businesses in the Health & Medical category with poor customer experience
        { $match: { customerExperience: "Poor", "biz.categories": "Health & Medical"} },

        // Collapse back to one doc per biz: pick the “first” of each field
        {
            $group: {
                _id: "$biz.name",
                city: { $first: "$biz.city" },
                oneStarRatio:   { $first: "$oneStarRatio" },
                customerExperience: { $first: "$customerExperience" }
            }
        },
        // 5. Shape output, sort by worst ratio first
        {
            $project: {
                _id:                 0,
                businessName:        "$_id", // NOTE: _id is the grouped business name
                city:                1,
                oneStarRatio:         1,
                customerExperience:   1
            }
        },
        { $sort: { oneStarRatio: -1 } }

    ];

    const results = await revColl.aggregate(pipeline).toArray();
    console.log(results);
}

//Running Task 3 — Find medical businesses with poor customer experience
// [
//   {
//     city: 'Montecito',
//     oneStarRatio: 0.5,
//     customerExperience: 'Poor',
//     businessName: 'WellCare Clinic'
//   },
//   {
//     city: 'Long Beach',
//     oneStarRatio: 0.3076923076923077,
//     customerExperience: 'Poor',
//     businessName: 'Harmony Medical'
//   },
//   {
//     city: 'Fresno',
//     oneStarRatio: 0.3,
//     customerExperience: 'Poor',
//     businessName: 'Sunrise Family Practice'
//   },
//   {
//     city: 'Isla Vista',
//     oneStarRatio: 0.3,
//     customerExperience: 'Poor',
//     businessName: 'Rapid Relief Health'
//   }
// ]