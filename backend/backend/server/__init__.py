from fastapi import FastAPI
from .home_handler import home_router
from .documents_handlers import documents_router
from .users_handlers import users_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
        CORSMiddleware, 
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"])

app.include_router(documents_router, prefix="/api/documents")
app.include_router(users_router, prefix="/api/user")
app.include_router(home_router)

