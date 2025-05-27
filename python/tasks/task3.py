import json
from mongo_client import get_client
from config import DATABASE_NAME

def run():
    client = get_client()
    db = client[DATABASE_NAME]

    pipeline = [

        # TODO: Create an aggregation pipeline to find businesses in the Health & Medical category with poor customer experience'
        # **Note that this task connects to the 'review' collection**

    ]

    results = list(db.review.aggregate(pipeline))
    print(json.dumps(results, indent=2))

    client.close()

if __name__ == "__main__":
    run()
