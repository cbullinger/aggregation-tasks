# tasks/task2.py

import json
from mongo_client import get_client
from config import DATABASE_NAME

def run():
    """
    Task 2: Find acupuncture businesses with wait-related complaints
    1. Filter for open businesses with 'Acupuncture' in categories
    2. Join to the `review` collection on business_id
    3. Unwind the joined reviews array
    4. Filter for reviews whose text matches “wait(ed|ing)?” or “slow service” (case-insensitive)
    5. Group by business name and city, counting those reviews
    6. Project businessName, city, and waitReviewCount; sort descending
    """
    client = get_client()
    db = client[DATABASE_NAME]

    pipeline = [
        {"$match": {
            "is_open": True,
            "categories": "Acupuncture"
        }},
        {"$lookup": {
            "from": "review",
            "localField": "business_id",
            "foreignField": "business_id",
            "as": "reviews"
        }},
        {"$unwind": "$reviews"},
        {"$match": {
            "reviews.text": {
                "$regex": r"(wait(ed|ing)?|slow service)",
                "$options": "i"
            }
        }},
        {"$group": {
            "_id": "$name",
            "city": {"$first": "$city"},
            "waitReviewCount": {"$sum": 1}
        }},
        {"$project": {
            "_id": 0,
            "businessName": "$_id",
            "city": 1,
            "waitReviewCount": 1
        }},
        {"$sort": {"waitReviewCount": -1}}
    ]

    results = list(db.business.aggregate(pipeline))
    print(json.dumps(results, indent=2))
    client.close()

if __name__ == "__main__":
    run()
