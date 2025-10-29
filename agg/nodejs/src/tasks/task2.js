import { getBusinessCollection } from '../config.js';

export const name = '2';
export const description = 'Find acupuncture businesses with wait-related complaints';

/*
 Task 2: Find acupuncture businesses with wait-related complaints
 ================================================================
 This file connects to the 'yelp.business' collection.

 Your task is to find acupuncture businesses that reviews related to wait times.
  1. Find open businesses (`is_open` == true) with 'Acupuncture' in `categories`
  2. Join the `business` and `review` collections by their `business_id` fields using `$lookup`
  3. Unwind the reviews array to process each review individually
  4. Filter for review `text` mentioning wait-related complaints ("wait", "waited", "waiting", "slow service") using a regex match
  5. Group filtered results by:
        - `businessName`
        - `city`
        - `waitReviewCount` (count of reviews per business)
  6. Return only the unique `businessName`, `city`, and`waitReviewCount` fields
  7. Sort by `waitReviewCount` in descending order

 See: https://www.mongodb.com/docs/drivers/node/current/aggregation/
*/

export async function run() {
    const coll = await getBusinessCollection();

    const pipeline = [

        // TODO: Add your aggregation stages here, then run the file: `npm run task 2`

    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log(results);
}
