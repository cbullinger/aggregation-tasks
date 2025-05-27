import sys
from mongo_client import get_client
from config import DATABASE_NAME

def run():
    client = None
    try:
        client = get_client()
        print("Successfully connected to Atlas")

        db = client[DATABASE_NAME]
        coll = db.business

        pipeline = [
            {"$group": {"_id": "$city", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 5}
        ]
        top_five = list(coll.aggregate(pipeline))
        print("Top 5 Cities by Business Count:")
        for doc in top_five:
            print(f"  {doc['_id']}: {doc['count']}")

    except Exception as err:
        print("Error:", err)
        sys.exit(1)

    finally:
        if client:
            client.close()
            print("\nConnection closed")

if __name__ == "__main__":
    run()
