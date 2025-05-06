import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function updateStarsField() {
    try {
        await client.connect();
        const database = client.db('yelp');
        const collection = database.collection('business');

        const result = await collection.updateMany(
            { stars: { $type: 'int' } }, // Match documents where stars is an integer
            [
                { $set: { stars: { $toDouble: '$stars' } } } // Convert stars to float
            ]
        );

        console.log(`Updated ${result.modifiedCount} documents.`);
    } catch (error) {
        console.error('Error updating documents:', error);
    } finally {
        await client.close();
    }
}

updateStarsField();