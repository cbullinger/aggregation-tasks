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

        # TODO: Add your aggregation stages here, then run the file: `python3 main.py 1`

    ]

    results = list(db.business.aggregate(pipeline))
    print(json.dumps(results, indent=2))
    client.close()

if __name__ == "__main__":
    run()
