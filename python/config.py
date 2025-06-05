from dotenv import load_dotenv
import os

load_dotenv()

uri = "mongodb+srv://pymongo:SMa3tCqx3HNAhjEc@cluster0.ztsso0w.mongodb.net"

# Set connection string
MONGODB_URI = os.getenv("MONGODB_URI", uri)
if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI must be set in .env")

DATABASE_NAME = os.getenv("DATABASE_NAME", "yelp")
