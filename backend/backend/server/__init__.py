from fastapi import FastAPI
from .home_handler import home_router
from .documents_handlers import documents_router
from .users_handlers import users_router

app = FastAPI()

app.include_router(documents_router, prefix="/documents")
app.include_router(users_router, prefix="/user")
app.include_router(home_router)

