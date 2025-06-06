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

        # NOTE: Group by `review` collection, NOT `business`
        # 1. Count total and one-star reviews per business
        {"$group": {
            "_id": "$business_id",
            "totalReviews": {"$sum": 1},
            "oneStarReviews": {
                "$sum": {
                    "$cond": [{"$eq": ["$stars", 1]}, 1, 0]
                }
            }
        }},
        # 2. Compute oneStarRatio
        {"$addFields": {
            "oneStarRatio": {
                "$cond": [
                    {"$eq": ["$totalReviews", 0]}, 0,
                    {"$divide": ["$oneStarReviews", "$totalReviews"]}
                ]
            }
        }},
        # 3. Bucket into customerExperience
        {"$addFields": {
            "customerExperience": {
                "$switch": {
                    "branches": [
                        {"case": {"$lte": ["$oneStarRatio", 0.05]}, "then": "Excellent"},
                        {"case": {"$lte": ["$oneStarRatio", 0.15]}, "then": "Good"},
                        {"case": {"$lte": ["$oneStarRatio", 0.25]}, "then": "Fair"}
                    ],
                    "default": "Poor"
                }
            }
        }},
        # 4. Join with business collection
        {"$lookup": {
            "from": "business",
            "localField": "_id",
            "foreignField": "business_id",
            "as": "biz"
        }},
        {"$unwind": "$biz"},
        # 5. Filter for Health & Medical + Poor experience
        {"$match": {
            "customerExperience": "Poor",
            "biz.categories": "Health & Medical"
        }},
        # 6. Collapse back to one doc per business
        {"$group": {
            "_id": "$biz.name",
            "city": {"$first": "$biz.city"},
            "oneStarRatio": {"$first": "$oneStarRatio"},
            "customerExperience": {"$first": "$customerExperience"}
        }},
        # 7. Shape output & sort
        {"$project": {
            "_id": 0,
            "businessName": "$_id",
            "city": 1,
            "oneStarRatio": 1,
            "customerExperience": 1
        }},
        {"$sort": {"oneStarRatio": -1}}
    ]

    results = list(db.review.aggregate(pipeline))
    print(json.dumps(results, indent=2))

    client.close()

if __name__ == "__main__":
    run()
# Output:
# [
#   {
#     "city": "Montecito",
#     "oneStarRatio": 0.5,
#     "customerExperience": "Poor",
#     "businessName": "WellCare Clinic"
#   },
#   {
#     "city": "Long Beach",
#     "oneStarRatio": 0.3076923076923077,
#     "customerExperience": "Poor",
#     "businessName": "Harmony Medical"
#   },
#   {
#     "city": "Fresno",
#     "oneStarRatio": 0.3,
#     "customerExperience": "Poor",
#     "businessName": "Sunrise Family Practice"
#   },
#   {
#     "city": "Long Beach",
#     "oneStarRatio": 0.27906976744186046,
#     "customerExperience": "Poor",
#     "businessName": "Rapid Relief Health"
#   }
# ]

