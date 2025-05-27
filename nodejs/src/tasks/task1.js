import {getBusinessCollection} from '../config.js';

export const name = '1';
export const description = 'Find highly rated, reputable restaurants';

export async function run() {
    const coll = await getBusinessCollection();

    const pipeline = [

        // TODO: Create an aggregation pipeline to get reputation scores for highly rated restaurants.

    ];

    const results = await coll.aggregate(pipeline).toArray();
    console.log(results);
}
