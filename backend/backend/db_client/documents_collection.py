from pydantic import BaseModel
from typing import List
from bson import ObjectId
from .__init__ import documents_db

class DocumentModel(BaseModel):
    id: str
    name: str
    text: str

class DocumentsWorker():
    def __init__(self) -> None:
        self.public_documents_collection = documents_db.public
        self.private_documents_collection = documents_db.private

    @staticmethod
    def document_to_model(document: dict) -> DocumentModel:
        document['id'] = str(document['_id'])
        del document['_id']
        return DocumentModel(**document)

    def get_public_document_by_id(self, id: str) -> DocumentModel | None:
        document = self.public_documents_collection.find_one({"_id": ObjectId(id)})
        if document:
            return self.document_to_model(document)
        else:
            return None

    def get_public_documents(self) -> List[DocumentModel]:
        documents = self.public_documents_collection.find()
        return [self.document_to_model(doc) for doc in documents]

    # def add_document(self, document: DocumentModel):
        
