import json
from mongo_client import get_client
from config import DATABASE_NAME

def run():
    """
    Task 3: Find medical businesses with poor customer experience
    ==============================================================
    This file connects to the 'yelp.review' collection.

    Your task is to find medical businesses with poor customer experience based on their reviews.
      1. Group reviews by `business_id`, and get the count for:
            - `totalReviews` (reviews per business)
            - `oneStarReviews` (reviews with 1 star per business)
      2. Compute new field `oneStarRatio` as `oneStarReviews`:`totalReviews`
      3. Bucket new field `customerExperience` based on `oneStarRatio`:
            - Excellent ≤ 5%
            - Good ≤ 15%
            - Fair ≤ 25%
            - Poor > 25%
      4. Join the `review` and `business` collections by `business_id` field to a new `biz` array
      5. Unwind and filter results by:
            - "Poor" customer experience
            - "Health & Medical" in `biz.categories`
      6. Collapse back to one document per business
      7. Return the business `name`, `city`, `oneStarRatio`, and `customerExperience` fields
      8. Sort by `oneStarRatio` descending

    See: https://www.mongodb.com/docs/languages/python/pymongo-driver/current/aggregation/
    """
    client = get_client()
    db = client[DATABASE_NAME]
    coll = db.review

    pipeline = [

        # TODO: Add your aggregation stages here, then run the file to test your code.
        # NOTE: This task connects to the 'review' collection
    ]

    results = list(coll.aggregate(pipeline))
    print(json.dumps(results, indent=2))

    client.close()

if __name__ == "__main__":
    run()
