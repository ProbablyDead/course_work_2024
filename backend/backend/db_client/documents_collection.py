from pydantic import BaseModel
from typing import List
from bson import ObjectId
from .__init__ import db

class DocumentModel(BaseModel):
    id: str
    text: str

class DocumentsWorker():
    def __init__(self) -> None:
            self.documents_collection = db.documents

    @staticmethod
    def document_to_model(document: dict) -> DocumentModel:
        document['id'] = str(document['_id'])
        del document['_id']
        return DocumentModel(**document)

    def get_document_by_id(self, id: str) -> DocumentModel | None:
        document = self.documents_collection.find_one({"_id": ObjectId(id)})
        if document:
            return self.document_to_model(document)
        else:
            return None

    def get_documents(self) -> List[DocumentModel]:
        documents = self.documents_collection.find()
        return [self.document_to_model(doc) for doc in documents]
