from pydantic import BaseModel
from .__init__ import db

class UserModel(BaseModel):
    username: str
    password: str

class UsersWorker():
    def __init__(self) -> None:
        self.users_collection = db.users

    @staticmethod
    def document_to_model(document: dict) -> UserModel:
        document['id'] = str(document['_id'])
        del document['_id']
        return UserModel(**document)

    def add_user(self, user: UserModel):
        if not self.get_user_by_username(user.username):
            self.users_collection.insert_one(user.model_dump())
        else:
            raise 

    def get_user_by_username(self, username: str) -> UserModel | None:
        document = self.users_collection.find_one({"username": username})
        if document:
            return self.document_to_model(document)
        else:
            return None

