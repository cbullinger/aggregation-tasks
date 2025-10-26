import {getBusinessCollection} from '../../config.js';

export async function run() {
    const coll = await getBusinessCollection();

    const pipeline = [
        {$group: {_id: '$city', count: { $sum: 1 }}}, {$sort: { count: -1 }}, {$limit: 5}
    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log(results);
}
