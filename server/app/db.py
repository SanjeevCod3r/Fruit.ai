from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = None
db = None

def connect_db():
    global client, db
    mongo_uri = os.getenv("MONGO_URI")
    db_name = os.getenv("MONGO_DB_NAME")

    if not mongo_uri or not db_name:
        raise Exception("MongoDB configuration is missing!")

    client = MongoClient(mongo_uri)
    db = client[db_name]
    print("MongoDB connection established.")

def get_db():
    return db
