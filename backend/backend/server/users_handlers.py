from fastapi import HTTPException, APIRouter

from ..db_client.users_collection import UsersWorker, UserModel
db = UsersWorker()

users_router = APIRouter()
@users_router.post("/user/add")
async def add_user(user: UserModel):
    try:
        db.add_user(user)
    except:
        raise HTTPException(status_code=409, detail="User already exists")


