import json
from mongo_client import get_client
from config import DATABASE_NAME

def run():
    client = get_client()
    db = client[DATABASE_NAME]

    pipeline = [
        # TODO: Create an aggregation pipeline to get reputation scores for highly rated restaurants.
    ]

    results = list(db.business.aggregate(pipeline))
    print(json.dumps(results, indent=2))
    client.close()

if __name__ == "__main__":
    run()
