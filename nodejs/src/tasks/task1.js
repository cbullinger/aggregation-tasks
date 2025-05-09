import {getBusinessCollection} from '../config.js';

export const name = 'findHighlyRated';
export const description = 'Task 1: Find highly rated, open businesses with > 10 reviews';

export async function run() {
    const coll = await getBusinessCollection();

const pipeline = [
    // 1. Filter to open, highly rated businesses
    {
        $match: {
            is_open:      1,
            stars:        { $gte: 4.5 },
            review_count: { $gt: 10 }
        }
    },
    // 2. Compute a reputationScore field from stars and review_count, as a number
    { $addFields: {
            reputationScore: { $round: [{ $multiply: ['$stars', '$review_count'] }, 0] }
        }},
    // 3. Project only the needed output fields
    {
        $project: {
            _id:             0,
            name:            1,
            city:            1,
            reputationScore: 1
        }
    },
    // 4. Sort descending by reputationScore
    {
        $sort: { reputationScore: -1 }
    }
];

    const results = await coll.aggregate(pipeline).toArray();
    console.log('\nTask 1 Results:');
    console.table(results);
}

