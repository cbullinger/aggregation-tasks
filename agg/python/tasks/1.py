"""
Task 1: Basic aggregation pipeline - $match and $group
Updated: 2026-04-20 (copier test)
"""
from pymongo.database import Database


def run(db: Database) -> list:
    """Count movies by genre using aggregation."""
    collection = db["movies"]

    pipeline = [
        {"$unwind": "$genres"},
        {"$group": {"_id": "$genres", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10},
    ]

    results = list(collection.aggregate(pipeline))
    for r in results:
        print(f"  {r['_id']}: {r['count']}")
    return results
