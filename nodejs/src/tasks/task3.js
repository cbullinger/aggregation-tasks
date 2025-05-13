import { getBusinessCollection } from '../config.js';

export const name = '3';
export const description = 'Group complaints and compute a riskLevel';

export async function run() {
    const coll = await getBusinessCollection();

    const pipeline = [
        // TODO: Create an aggregation pipeline to get wait-related complaints
        //  - Join the `business` and `review` collections by their `business_id` fields using `$lookup`
        //  - Filter for wait-related complaints using `$match` (e.g. text includes "wait", "took forever", "waited a long time", etc.)
        //  - Use $group to group by business, collecting the following stats:
        //    - `totalComplaints`: the total number of complaints for each business
        //    - `totalReviews`: the total number of reviews for each business
        //
        //  - Compute the `complaint_ratio` as the ratio of `totalComplaints` to `totalReviews`
        //  - Compute the `riskLevel` based on the `complaintRatio`:
        //    - 'high' if the ratio is greater than 0.3
        //    - 'medium' if the ratio is between 0.1 and 0.3
        //    - 'low' if the ratio is less than 0.1
        //
        //  Use $project to return only the `businessName` and the `complaintRatio`
        //  Sort by the `riskLevel`

    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log('\nTask 3 Results:');
    console.table(results);
}
