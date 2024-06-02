from pymongo.errors import ServerSelectionTimeoutError
from pymongo import MongoClient

from ..config import MONGO_DB_PATH

try:
    client = MongoClient(MONGO_DB_PATH, ServerSelectionTimeoutMS=1)
except ServerSelectionTimeoutError as err:
    print(err)
    exit(1)
else:
    documents_db = client.Documents
    users_db = client.Users

