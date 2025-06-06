import json
from mongo_client import get_client
from config import DATABASE_NAME

def run():
    """
    Task 1: Find highly rated, reputable restaurants
    =================================================
    This file connects to the 'yelp.business' collection.

    Your task is to find highly rated restaurants, then compute a reputation score:
      1. Find highly rated restaurants:
         - The `categories` array includes 'Restaurants'
         - Has a 4.6 rating (`stars`) or higher
         - Has more than 500 reviews (`review_count`)
      2. Calculate a new `reputationScore` field as the product of `stars` and `review_count`, rounded to the nearest integer
      3. Return only the `name`, `city`, and `reputationScore` fields.
      4. Sort by `reputationScore` in descending order.

    See: https://www.mongodb.com/docs/languages/python/pymongo-driver/current/aggregation/
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

# Output:{
#     "name": "Neko Sushi",
#     "city": "Santa Barbara",
#     "reputationScore": 4841.0
#   },
#   {
#     "name": "Luna Pizzeria",
#     "city": "San Diego",
#     "reputationScore": 4008.0
#   },
#   {
#     "name": "The Ramen Bar",
#     "city": "San Diego",
#     "reputationScore": 3782.0
#   },
#   {
#     "name": "Pasta + Co.",
#     "city": "Long Beach",
#     "reputationScore": 2962.0
#   },
#   {
#     "name": "Mama's Kitchen",
#     "city": "San Diego",
#     "reputationScore": 2496.0
#   }
# ]
