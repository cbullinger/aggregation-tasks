from pymongo import errors

from mongo_client import get_client
from config import DATABASE_NAME

def main():
    client = None
    try:
        client = get_client()
        client.admin.command("ping")
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

    except errors.ServerSelectionTimeoutError as e:
        print("Ping failed — could not reach the server:")
        print(str(e))

    finally:
        client.close()

if __name__ == "__main__":
    main()
