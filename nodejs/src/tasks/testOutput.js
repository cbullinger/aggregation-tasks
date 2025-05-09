import { getBusinessCollection } from '../config.js';

export const name = 'test';
export const description = 'Test output of aggregation pipeline';

export async function run() {
    const coll = await getBusinessCollection();



    const results = await coll.aggregate(pipeline).toArray();
    console.log('\nResults:');
    console.log(results);
  //  console.table(results);
    // Extract and return the IDs for downstream use
    // const businessIds = results.map(doc => doc.business_id);
    // console.log('Business IDs:', businessIds);
    // return businessIds;
}