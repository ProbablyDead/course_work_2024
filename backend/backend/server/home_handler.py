from fastapi import APIRouter, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

home_router = APIRouter()

home_router.mount("/static", StaticFiles(directory="../client/build/static"), "static")
templates = Jinja2Templates(directory="../client/build")

@home_router.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

