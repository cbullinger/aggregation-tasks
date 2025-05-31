import json
from mongo_client import get_client
from config import DATABASE_NAME

def run():
    """
    Task 1: Find highly rated, reputable restaurants
    =================================================
        This file connects to a dataset of businesses that includes restaurants through the
        yelp.business collection. Your job is to fill in the aggregation logic
        based on the requirements below. Connection code and data setup are already handled for you.
    """
    client = get_client()
    db = client[DATABASE_NAME]

    pipeline = [

        # TODO: Create an aggregation pipeline to get reputation scores for highly rated restaurants:
        # 1. Filter for 'Restaurants' (in `categories`) with a 4.6 rating (`stars`) or higher and more than 500 reviews (`review_count`)
        # 2. Calculate a new `reputationScore` field as the product of `stars` and `review_count`, rounded to the nearest integer
        # 3. Return only the `name`, `city`, and `reputationScore` fields, sorted by `reputationScore` descending

    ]

    results = list(db.business.aggregate(pipeline))
    print(json.dumps(results, indent=2))
    client.close()

if __name__ == "__main__":
    run()
