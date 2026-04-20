/**
 * Task 2: Aggregation with $lookup
 * Updated: 2026-04-20 (copier test)
 */
async function run(db) {
  const collection = db.collection('movies');

  // Join movies with comments
  const pipeline = [
    { $limit: 5 },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'movie_id',
        as: 'comments'
      }
    },
    { $project: { title: 1, commentCount: { $size: '$comments' } } }
  ];

  const results = await collection.aggregate(pipeline).toArray();
  console.log('Movies with comment counts:');
  results.forEach(r => console.log(`  ${r.title}: ${r.commentCount} comments`));
  return results;
}

module.exports = { run };
