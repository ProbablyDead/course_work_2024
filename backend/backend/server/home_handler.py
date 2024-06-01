from fastapi import APIRouter, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path
from ..config import CLIENT_PATH

home_router = APIRouter()

dir = Path(str(CLIENT_PATH)).absolute()

home_router.mount("/static", StaticFiles(directory=dir / "static"), "static")
templates = Jinja2Templates(directory=dir)

@home_router.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

