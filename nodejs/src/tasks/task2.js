import { getBusinessCollection } from '../config.js';

export const name = '2';
export const description = 'Find acupuncture businesses with wait-related complaints';

export async function run() {
    const coll = await getBusinessCollection();

    // Solution to Task 2 -  Find acupuncture businesses with wait-related complaints
    // 1. Filter for open businesses with 'Acupuncture' in categories
    // 2. Join the `business` and `review` collections by their `business_id` fields using `$lookup`
    // 3. Unwind the reviews array to process each review individually
    // 4. Filter for reviews that mention wait-related complaints using a regex match
    // 5. Group by business name, city, and calculate the count of wait-related reviews and average stars
    // 6. Project the business name, city, count of wait-related reviews, and average stars

    const pipeline = [

        // TODO: Create an aggregation pipeline to find acupuncturists with wait-related complaints
        
        {
            $match: {
                is_open: true,
                categories: 'Acupuncture',
            }
        },
        // NOTE: Apply $lookup to join by 'business_id', then $unwind the joined array
        {
            $lookup: {
                from: 'review', // NOTE: must match the collection name exactly
                localField: 'business_id',
                foreignField: 'business_id',
                as: 'reviews'
            }
        },
        { $unwind: '$reviews' },

        // NOTE: Observe regex definitions (case sensitivity, 'wait' variations, etc.)
        {
            $match: {
                'reviews.text': {
                    $regex: /(wait(ed|ing)?|slow service)/i
                }
            }
        },
        // NOTE: Use $group to aggregate by business name and city
        {
            $group: {
                _id: '$name', // NOTE: set '_id' to business name to prevent duplicates
                city: { $first: '$city' }, // NOTE: $first returns 'city' field value from first doc in each business group
                waitReviewCount: { $sum: 1 }, // Count the number of wait-related reviews
            }
        },
        {
            $project: {
                _id: 0,
                businessName: '$_id', // Rename _id to businessName in output
                city: 1,
                waitReviewCount: 1, // Include the count of wait-related reviews
            }
        },
        { $sort: { waitReviewCount: -1 }}, // Sort by number of wait reviews in descending order
    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log(results);
}

//Running Task 2 — Find acupuncture businesses with wait-related complaints
// [
//   {
//     city: 'Los Angeles',
//     waitReviewCount: 60,
//     businessName: 'Needle & Flow'
//   },
//   { city: 'Fresno',
//     waitReviewCount: 58,
//     businessName: 'Chi Wellness' },
//   {
//     city: 'Fresno',
//     waitReviewCount: 20,
//     businessName: 'Balance Acupuncture'
//   }
// ]
