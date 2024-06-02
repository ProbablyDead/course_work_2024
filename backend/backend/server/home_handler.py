from fastapi import APIRouter, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse
from pathlib import Path
from ..config import CLIENT_PATH

home_router = APIRouter()

dir = Path(str(CLIENT_PATH))

home_router.mount("/static", StaticFiles(directory=dir / "static", html=True), "static")
templates = Jinja2Templates(directory=dir)

@home_router.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Additional route to serve other assets like JS, CSS, etc.
@home_router.get("/{full_path:path}")
async def read_react_app(full_path: str):
    file_path = dir / full_path
    if Path.exists(file_path):
        return FileResponse(file_path)
    else:
        # Fallback to index.html for client-side routing
        return FileResponse(dir / 'index.html')
