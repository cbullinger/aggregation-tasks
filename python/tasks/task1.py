# tasks/task1.py

import json
from mongo_client import get_client
from config import DATABASE_NAME

def run():
    """
    Task 1: Find highly rated, reputable restaurants
    1. Filter for Restaurants with stars ≥ 4.6 and review_count > 500
    2. Compute reputationScore = round(stars * review_count)
    3. Project name, city, reputationScore
    4. Sort by reputationScore descending
    """
    client = get_client()
    db = client[DATABASE_NAME]

    pipeline = [
        {
            "$match": {
                "categories": "Restaurants",
                "stars": {"$gte": 4.6},
                "review_count": {"$gt": 500}
            }
        },
        {
            "$addFields": {
                "reputationScore": {
                    "$round": [
                        {"$multiply": ["$stars", "$review_count"]},
                        0
                    ]
                }
            }
        },
        {
            "$project": {
                "_id": 0,
                "name": 1,
                "city": 1,
                "reputationScore": 1
            }
        },
        {
            "$sort": {"reputationScore": -1}
        }
    ]

    results = list(db.business.aggregate(pipeline))
    print(json.dumps(results, indent=2))
    client.close()

if __name__ == "__main__":
    run()
