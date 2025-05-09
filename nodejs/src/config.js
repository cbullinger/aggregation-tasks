import { MongoClient } from 'mongodb';
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('MONGODB_URI must be set');
}

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

