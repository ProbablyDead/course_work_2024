import { useCallback, useEffect, useState } from "react";
import PublicDocumentsAPIProps from "../../ts/interfaces/API/PublicDocuments_API.interface";
import PrivateDocumentsAPIProps from "../../ts/interfaces/API/PrivateDocuments_API.interface";
import DocumentsList from "./DocumentsList";
import Document from "./Document";
import LatexDocument from "../../ts/classes/LatexDocument.class";
import './styles/DocumentsPage.css'

interface DocumentsPageProps {
    publicDocumentsAPI: PublicDocumentsAPIProps;
    privateDocumentsAPI: PrivateDocumentsAPIProps;
    errorOccured: (message: string) => void;
};

const DocumentsPage: React.FC<DocumentsPageProps> = ({publicDocumentsAPI,
    privateDocumentsAPI,
    errorOccured}) => {

    const [publicDocs, setPublicDocs] = useState<LatexDocument[]>([]);
    const [privateDocs, setPrivateDocs] = useState<LatexDocument[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<LatexDocument | null>(null);

    useEffect(() => {
        publicDocumentsAPI.getDocumentsList(setPublicDocs, errorOccured);
        privateDocumentsAPI.getDocumentsList(setPrivateDocs, errorOccured);
    }, [publicDocumentsAPI, privateDocumentsAPI, errorOccured]);

    const handleBackClick = useCallback(() => {
        setSelectedDocument(null);
    }, []);

    const handleChange = useCallback((document: LatexDocument) => {
        privateDocumentsAPI.updatePrivateDocument(document, () => {}, errorOccured);
    }, [privateDocumentsAPI, errorOccured]);

    return (
    <div className="documents-page">
            {selectedDocument ? (
                <Document doc={selectedDocument} onBack={handleBackClick} onChange={handleChange} errorOccured={errorOccured}/>
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
