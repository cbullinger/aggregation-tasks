/**
 * MongoDB Aggregation Tasks - Node.js
 * Updated: 2026-04-20 (copier test)
 */
const { MongoClient } = require('mongodb');
const config = require('./config');

async function main() {
  const client = new MongoClient(config.uri);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(config.database);

    // Run aggregation tasks
    const tasks = require('./tasks/task1');
    await tasks.run(db);

    console.log('All tasks completed successfully');
  } finally {
    await client.close();
  }
}

main().catch(console.error);
// audit-verify test 2026-04-30
