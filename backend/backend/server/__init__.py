import uvicorn
from fastapi import FastAPI

# Define a FastAPI app
app = FastAPI()

from .handlers import *

def main():
    uvicorn.run("backend.server:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()
