import { MongoClient } from 'mongodb';

const uri = 'PASTE-CONNECTION-STRING-HERE'; // Replace with your MongoDB connection string

const client = new MongoClient(uri);
const dbName = 'yelp';

/**
 * Returns the business collection.
 */
export async function getBusinessCollection() {
    await client.connect();
    return client.db(dbName).collection('business');
}

/**
 * Returns the review collection.
 */
export async function getReviewCollection() {
    await client.connect();
    return client.db(dbName).collection('review');
}


/**
 * Close client.
 */
export async function closeConnection() {
    await client.close();
}
