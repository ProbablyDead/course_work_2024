import os
from dotenv import load_dotenv

load_dotenv()

MONGO_DB_PATH = os.getenv("MONGO_DB_PATH")
CLIENT_PATH = os.getenv("CLIENT_PATH")

PORT = 8000
