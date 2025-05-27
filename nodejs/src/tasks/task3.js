import {getReviewCollection} from '../config.js';

export const name = '3';
export const description = 'Find medical businesses with poor customer experience';

export async function run() {
    const revColl = await getReviewCollection();

    const pipeline = [

        // TODO: Create an aggregation pipeline to find businesses in the Health & Medical category with poor customer experience'
        // **Note that this task connects to the 'review' collection**
    ];

    const results = await revColl.aggregate(pipeline).toArray();
    console.log(results);
}