import {getReviewCollection} from '../config.js';

export const name = '3';
export const description = 'Find medical businesses with poor customer experience';

/*
    Task 3: Find medical businesses with poor customer experience
    ==============================================================
    This file connects to the 'yelp.review' collection.

    Your task is to find medical businesses with poor customer experience based on their reviews.
      1. Group reviews by `business_id`, and get the count for:
            - `totalReviews` (reviews per business)
            - `oneStarReviews` (reviews with 1 star per business)
      2. Compute new field `oneStarRatio` as `oneStarReviews`:`totalReviews`
      3. Bucket new field `customerExperience` based on `oneStarRatio`:
            - Excellent ≤ 5%
            - Good ≤ 15%
            - Fair ≤ 25%
            - Poor > 25%
      4. Join the `review` and `business` collections by `business_id` field to a new `biz` array
      5. Unwind and filter results by:
            - "Poor" customer experience
            - "Health & Medical" in `biz.categories`
      6. Collapse back to one document per business
      7. Return the business `name`, `city`, `oneStarRatio`, and `customerExperience` fields
      8. Sort by `oneStarRatio` descending

   See: https://www.mongodb.com/docs/languages/python/pymongo-driver/current/aggregation/
*/


export async function run() {
    const revColl = await getReviewCollection();

    const pipeline = [

        // TODO: Add your aggregation stages here, then run the file: `npm run task 3`
        // ** NOTE: this task connects to the 'review' collection ** //
    ];

    const results = await revColl.aggregate(pipeline).toArray();
    console.log(results);
}
