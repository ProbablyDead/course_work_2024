from .config import PORT
from .server import app

def start():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)

