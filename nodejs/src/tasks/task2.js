import { getBusinessCollection } from '../config.js';

export const name = '2';
export const description = 'Find acupuncture businesses with wait-related complaints';

export async function run() {
    const coll = await getBusinessCollection();

    const pipeline = [

        // TODO: Create an aggregation pipeline to find acupuncturists with high wait-related complaint ratios.

    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log(results);
}

