// Task 2: Add a computed field `reputationScore` based on stars and review_count


import { getBusinessCollection } from '../config.js';

export const name = 'getReputationScore';
export const description = 'Task 2: Find highly rated, open businesses with > 10 reviews';

export async function run() {
    const coll = await getBusinessCollection();
    const pipeline = [
        // TODO: Reuse Task 1 filtering
        // TODO: Use $addFields or $project + $cond to create reputationScore field
        { $match: { is_open:1, stars:{ $gte:4.5 }, review_count:{ $gt:2500 } } },
        { $addFields: {
                reputationScore: { $multiply: ['$stars', '$review_count'] }
            }},
        { $project: {
                _id:0,
                business_id: 1,       // ← include the ID
                name:1,
                city:1,
                stars:1,
                review_count:1,
                reputationScore:1
            }},
        { $sort: { reputationScore:-1 } }
    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log('\nTask 2 Results:');
    console.table(results);


    // Extract and return the IDs for downstream use
    const businessIds = results.map(doc => doc.business_id);
    console.log('Task 2 Business IDs:', businessIds);
    return businessIds;
}


