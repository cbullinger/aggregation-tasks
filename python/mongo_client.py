from pymongo import MongoClient, errors
from config import MONGODB_URI
import certifi

def get_client():
    try:
        client = MongoClient(
            MONGODB_URI,
            tlsCAFile=certifi.where(),
            serverSelectionTimeoutMS=5000,   # 5s timeout
            connectTimeoutMS=5000            # also 5s on initial TCP connect
        )
        # force a quick “ping” to confirm
        client.admin.command("ping")
        return client
    except errors.ServerSelectionTimeoutError as err:
        print("Failed to connect to MongoDB:")
        print(err)
        raise
