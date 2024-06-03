import os
from dotenv import load_dotenv

load_dotenv()

MONGO_DB_PATH = f"mongodb://{os.getenv("MONGO_USER")}:{os.getenv("MONGO_PASSWORD")}@mongodb:27017"
CLIENT_PATH = os.getenv("CLIENT_PATH")

PORT = 8000
