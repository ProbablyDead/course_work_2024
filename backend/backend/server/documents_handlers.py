from typing import Dict, List
from fastapi import HTTPException, APIRouter
from fastapi.responses import FileResponse
from htmldocx.h2d import Document

from ..db_client.users_collection import UserModel, UsersWorker
from ..db_client.documents_collection import DocumentModel, DocumentsWorker

db = DocumentsWorker()
user_db = UsersWorker()
documents_router = APIRouter()

def login_user(user: UserModel) -> UserModel:
    try:
        return user_db.login_user(user)
    except Exception as err:
        raise HTTPException(status_code=401, detail=str(err))

# Public 
@documents_router.get("/public", response_model=List[DocumentModel])
async def get_public_documents():
    return db.get_public_document_ids()

@documents_router.get("/public/{document_id}", response_model=DocumentModel)
async def get_public_document(document_id: str):
    document = db.get_public_document_by_id(document_id)
    if document:
        return document
    else:
        raise HTTPException(status_code=404, detail="Document not found")

# Private
@documents_router.post("/private", response_model=List[DocumentModel])
async def get_private_documents(user: UserModel):
    found_user = login_user(user)
    return db.get_private_documents_by_ids(found_user.private_documents)

@documents_router.post("/private/{document_id}", response_model=DocumentModel)
async def get_private_document(document_id: str, user: UserModel):
    user_model = login_user(user)

    if not user_model.check_private_document(document_id):
        raise HTTPException(status_code=404, detail="Private document not found")

    document = db.get_private_document_by_id(document_id)
    if document:
        return document
    else:
        raise HTTPException(status_code=404, detail="Document not found")

@documents_router.post("/add/private", response_model=DocumentModel)
async def add_private_document(struct: Dict[str, str]):
    user = login_user(UserModel(username=struct["username"], password=struct["password"]))
    id = db.add_private_document(DocumentModel(name=struct["name"], text=struct["text"]))
    user_db.add_private_doc_to_user(user, id)
    document = db.get_private_document_by_id(id)
    if document:
        return document

@documents_router.post("/update/private", response_model=DocumentModel)
async def update_private_document(struct: Dict[str, str]):
    login_user(UserModel(username=struct["username"], password=struct["password"]))
    db.update_private_document(DocumentModel(id=struct["id"], name=struct["name"], text=struct["text"]))
    document = db.get_private_document_by_id(struct["id"])
    if document:
        return document

@documents_router.post("/delete/private") 
async def delete_private_document(struct: Dict[str, str]):
    login_user(UserModel(username=struct["username"], password=struct["password"]))
    db.delete_private_document(DocumentModel(id=struct["id"]))

import tempfile
import os
import asyncio
from htmldocx import HtmlToDocx

async def delete_temporary_file(pdf_path: str):
    await asyncio.sleep(5)  
    os.remove(pdf_path)

@documents_router.post("/generate_docx", response_class=FileResponse)
async def generate_pdf(struct: Dict[str, str]):
    filename = "tmp.pdf"
    text = struct["text"]

    with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as tmpfile:
        docx_path = tmpfile.name
        
        doc = Document()
        HtmlToDocx().add_html_to_document(text, doc)
        doc.save(docx_path)

        response = FileResponse(docx_path, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
                                headers={'Content-Disposition': f'attachment; filename={filename}'},
                                filename=filename)

        asyncio.create_task(delete_temporary_file(docx_path))

        return response

