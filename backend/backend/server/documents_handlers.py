from typing import List
from fastapi import HTTPException, APIRouter
from ..db_client.documents_collection import DocumentModel, DocumentsWorker

db = DocumentsWorker()
documents_router = APIRouter()

@documents_router.get("/documents/{document_id}", response_model=DocumentModel)
async def get_document(document_id: str):
    document = db.get_document_by_id(document_id)
    if document:
        return document
    else:
        raise HTTPException(status_code=404, detail="Document not found")

@documents_router.get("/documents", response_model=List[DocumentModel])
async def get_all_documents():
    return db.get_documents()

