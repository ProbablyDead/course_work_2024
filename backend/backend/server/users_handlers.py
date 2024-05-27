from fastapi import HTTPException, APIRouter

from ..db_client.users_collection import UsersWorker, UserModel
db = UsersWorker()

users_router = APIRouter()
@users_router.post("/user/signup")
async def add_user(user: UserModel):
    try:
        db.add_user(user)
    except Exception as err:
        raise HTTPException(status_code=409, detail=str(err))

@users_router.post("/user/login")
async def login_user(user: UserModel):
    try:
        db.login_user(user)
    except Exception as err:
        raise HTTPException(status_code=401, detail=str(err))

