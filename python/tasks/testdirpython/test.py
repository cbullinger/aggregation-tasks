import json
from mongo_client import get_client
from config import DATABASE_NAME

def run():
    """
    Test file to verify connection and aggregation pipeline syntax.
    """
    client = get_client()
    db = client[DATABASE_NAME]
    coll = db.business

    pipeline = [
        {"$group": {"_id": "$city", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 5}
    ]
    results = list(coll.aggregate(pipeline))
    print(json.dumps(results, indent=2))
    client.close()

if __name__ == "__main__":
    run()
