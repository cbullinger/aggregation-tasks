import {getBusinessCollection} from '../config.js';

export const name = '1';
export const description = 'Find highly rated, reputable restaurants';

/*
 Task 1: Find highly rated, reputable restaurants
 =================================================
 This file connects to the 'yelp.business' collection.

 Your task is to find highly rated restaurants, then compute a reputation score:
   1. Find highly rated restaurants:
      - The `categories` array includes 'Restaurants'
      - Has a 4.6 rating (`stars`) or higher
      - Has more than 500 reviews (`review_count`)
   2. Calculate a new `reputationScore` field as the product of `stars` and `review_count`, rounded to the nearest integer
   3. Return only the `name`, `city`, and `reputationScore` fields
   4. Sort by `reputationScore` in descending order

 See: https://www.mongodb.com/docs/drivers/node/current/aggregation/
*/

export async function run() {
    const coll = await getBusinessCollection();

    const pipeline = [

        // TODO: Add your aggregation stages here, then run the file: `npm run task 1`

    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log(results);
}
