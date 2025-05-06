# tasks/2.py

import json
from mongo_client import get_client
from config import DATABASE_NAME

def run():
    """
    Task 2: Find acupuncture businesses with wait-related complaints
    ================================================================
    This file connects to the 'yelp.business' collection.

    Your task is to find acupuncture businesses that reviews related to wait times.
      1. Find open businesses (`is_open` == true) with 'Acupuncture' in `categories`
      2. Join the `business` and `review` collections by their `business_id` fields using `$lookup`
      3. Unwind the reviews array to process each review individually
      4. Filter for review `text` mentioning wait-related complaints ("wait", "waited", "waiting", "slow service") using a regex match
      5. Group filtered results by:
          - `businessName`
          - `city`
          - `waitReviewCount` (count of reviews per business)
      6. Return only the unique `businessName`, `city`, and`waitReviewCount` fields
      7. Sort by `waitReviewCount` in descending order

    See: https://www.mongodb.com/docs/languages/python/pymongo-driver/current/aggregation/
    """

    client = get_client()
    db = client[DATABASE_NAME]
    coll = db.business

    pipeline = [

        # TODO: Add your aggregation stages here, then run the file: `python3 main.py 2`

    ]

    results = list(coll.aggregate(pipeline))
    print(json.dumps(results, indent=2))
    client.close()

if __name__ == "__main__":
    run()
