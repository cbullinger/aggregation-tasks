from dotenv import load_dotenv
import os

load_dotenv()

# TODO Set connection string
uri = "PASTE-CONNECTION-STRING-HERE"

MONGODB_URI = os.getenv("MONGODB_URI", uri)
if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI must be set in .env")

DATABASE_NAME = os.getenv("DATABASE_NAME", "yelp")
