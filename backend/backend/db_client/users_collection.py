from pydantic import BaseModel
from typing import List
from .__init__ import users_db

class UserModel(BaseModel):
    username: str
    password: str
    private_documents: List[str] = [] 

    def check_private_document(self, id: str) -> bool:
        return id in self.private_documents

class UsersWorker():
    def __init__(self) -> None:
        self.users_collection = users_db.users

    @staticmethod
    def document_to_model(document: dict) -> UserModel:
        document["private_documents"] = [str(doc) for doc in document["private_documents"]]
        return UserModel(**document)

    def get_user_by_username(self, username: str) -> UserModel | None:
        document = self.users_collection.find_one({"username": username})
        if document:
            return self.document_to_model(document)
        else:
            return None

    def add_user(self, user: UserModel):
        if not self.get_user_by_username(user.username):
            self.users_collection.insert_one(user.model_dump())
        else:
            raise Exception("User already exists")

    def login_user(self, user: UserModel) -> UserModel:
        found_user = self.get_user_by_username(user.username)
        if found_user:
            if found_user.password == user.password:
                return found_user
            else:
                raise Exception("Wrong password")
        else:
            raise Exception("No user found")

    def add_private_doc_to_user(self, user: UserModel, document_id: str):
        if not document_id in user.private_documents:
            user.private_documents.append(document_id)
            self.users_collection.update_one({"username": user.username}, 
                                             {"$set": {"private_documents": user.private_documents}})

