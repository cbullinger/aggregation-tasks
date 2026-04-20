/**
 * Task 1: Basic aggregation pipeline - $match and $group
 * Updated: 2026-04-20 (copier test)
 */
async function run(db) {
  const collection = db.collection('movies');

  // Count movies by genre
  const pipeline = [
    { $unwind: '$genres' },
    { $group: { _id: '$genres', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ];

  const results = await collection.aggregate(pipeline).toArray();
  console.log('Top 10 genres by movie count:');
  results.forEach(r => console.log(`  ${r._id}: ${r.count}`));
  return results;
}

module.exports = { run };
