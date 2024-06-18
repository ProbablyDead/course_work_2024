import { useCallback, useEffect, useState } from "react";
import PublicDocumentsAPIProps from "../../ts/interfaces/API/PublicDocuments_API.interface";
import PrivateDocumentsAPIProps from "../../ts/interfaces/API/PrivateDocuments_API.interface";
import DocumentsList from "./DocumentsList";
import Document from "./Document";
import GOSTDocument from "../../ts/classes/LatexDocument.class";
import './styles/DocumentsPage.css'

interface DocumentsPageProps {
    publicDocumentsAPI: PublicDocumentsAPIProps;
    privateDocumentsAPI: PrivateDocumentsAPIProps;
    errorOccured: (message: string) => void;
};

const DocumentsPage: React.FC<DocumentsPageProps> = ({publicDocumentsAPI,
    privateDocumentsAPI,
    errorOccured}) => {

    const [publicDocs, setPublicDocs] = useState<GOSTDocument[]>([]);
    const [privateDocs, setPrivateDocs] = useState<GOSTDocument[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<GOSTDocument | null>(null);

    useEffect(() => {
        publicDocumentsAPI.getDocumentsList(setPublicDocs, errorOccured);
        privateDocumentsAPI.getDocumentsList(setPrivateDocs, errorOccured);
    }, [publicDocumentsAPI, privateDocumentsAPI, errorOccured]);

    const handleBackClick = useCallback(() => {
        privateDocumentsAPI.getDocumentsList(setPrivateDocs, errorOccured);
        publicDocumentsAPI.getDocumentsList(setPublicDocs, errorOccured);
        setSelectedDocument(null);
    }, [publicDocumentsAPI, privateDocumentsAPI, errorOccured]);

    const handleChange = useCallback((document: GOSTDocument) => {
        privateDocumentsAPI.updatePrivateDocument(document, () => {}, errorOccured);
    }, [privateDocumentsAPI, errorOccured]);
 
    const handleCreateNew = useCallback((document: GOSTDocument) => {
        privateDocumentsAPI.addPrivateDocument(document.name + " (copy)", document.text ? document.text : "", 
        (document: GOSTDocument) => {setSelectedDocument(document)}, errorOccured);
    }, [privateDocumentsAPI, errorOccured]);
 
    const handleDownload = useCallback((name: string, text: string) => {
        const success = async (response: unknown) => {
            const blob = await (response as Response).blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            a.remove();
        };

        privateDocumentsAPI.getPDFDocument(text, success);
    }, [privateDocumentsAPI]);
 
    const handleDelete = useCallback((document: GOSTDocument) => {
        if (window.confirm("Are you sure you want to delete this document?")) 
            privateDocumentsAPI.deletePrivateDocument(document.id, 
            handleBackClick, errorOccured);
    }, [privateDocumentsAPI, handleBackClick, errorOccured]);
 
    return (
    <div className="documents-page">
            {selectedDocument ? (
                <Document doc={selectedDocument}
                    onBack={handleBackClick} 
                    onChange={handleChange}
                    onCreateNew={handleCreateNew}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
                    errorOccured={errorOccured}/>
            ) : (
                <>
                    <DocumentsList name="Public" docs={publicDocs} handleOpenDocument={(id: string) => 
                        {publicDocumentsAPI.getDocumentByID(id, setSelectedDocument, errorOccured)}} />
                    <div className="documents-separator"></div>
                    <DocumentsList name={`Private - ${privateDocumentsAPI.getUsername()}`} docs={privateDocs} handleOpenDocument={(id: string) => 
                        {privateDocumentsAPI.getDocumentByID(id, setSelectedDocument, errorOccured)}} />
                </>
            )}
    </div>
    );
};

export default DocumentsPage;
