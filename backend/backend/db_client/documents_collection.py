from pydantic import BaseModel
from typing import List, Optional
from bson import ObjectId
from .__init__ import documents_db

class DocumentModel(BaseModel):
    id: Optional[str] = None
    name: Optional[str] = ""
    text: Optional[str] = ""

class DocumentsWorker():
    def __init__(self) -> None:
        self.public_documents_collection = documents_db.public
        self.private_documents_collection = documents_db.private

    # Static section
    @staticmethod
    def document_to_model(document: dict) -> DocumentModel:
        document['id'] = str(document['_id'])
        del document['_id']
        return DocumentModel(**document)

    @staticmethod
    def get_document_by_id(id: str, collection) -> DocumentModel | None:
        document = collection.find_one({"_id": ObjectId(id)})
        if document:
            return DocumentsWorker.document_to_model(document)
        else:
            return None

    @staticmethod
    def get_documents(collection, ids={}) -> List[DocumentModel]:
        documents = collection.find(ids)
        documents_models = [DocumentsWorker.document_to_model(doc) for doc in documents]

        for doc in documents_models:
            delattr(doc, "text")

        return documents_models

    # Public section
    def get_public_document_by_id(self, id: str) -> DocumentModel | None:
        return self.get_document_by_id(id, self.public_documents_collection)

    def get_public_document_ids(self) -> List[DocumentModel]:
        return self.get_documents(self.public_documents_collection)

    # Private section
    def get_private_document_by_id(self, id: str) -> DocumentModel | None:
        return self.get_document_by_id(id, self.private_documents_collection)

    def get_private_documents_by_ids(self, ids: List[str]) -> List[DocumentModel]:
        return self.get_documents(self.private_documents_collection, 
                                   {"_id":{"$in": [ObjectId(doc_id) for doc_id in ids]}})

    def add_private_document(self, document: DocumentModel) -> str:
        delattr(document, "id")
        return self.private_documents_collection.insert_one(document.model_dump()).inserted_id

    def update_private_document(self, document: DocumentModel):
        self.private_documents_collection.update_one({"_id": ObjectId(document.id)}, 
                                                     {"$set": {"text": document.text, "name": document.name}})

    def delete_private_document(self, document: DocumentModel):
        self.private_documents_collection.delete_one({"_id": ObjectId(document.id)}) 

