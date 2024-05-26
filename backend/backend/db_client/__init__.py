from pymongo.errors import ServerSelectionTimeoutError
from pymongo import MongoClient

from backend.config import MONGO_DB_PATH

try:
    client = MongoClient(MONGO_DB_PATH, ServerSelectionTimeoutMS=1)
except ServerSelectionTimeoutError as err:
    print(err)
    exit(1)
else:
    db = client.data

