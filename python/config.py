from dotenv import load_dotenv
import os

load_dotenv()  # loads .env from project root

MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI must be set in .env")

DATABASE_NAME = os.getenv("DATABASE_NAME", "yelp")
