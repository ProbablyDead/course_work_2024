import DocumentPreview from "./DocumentPreview";
import LatexDocument from "../../ts/classes/LatexDocument.class";
import "./styles/DocumentList.css";

interface DocumentsListProps {
    docs: LatexDocument[];
    handleOpenDocument: (id: string) => void;
};

const DocumentsList: React.FC<DocumentsListProps> = ({docs, handleOpenDocument}) => {
    return (
        <div className="documents-list-container">
            <ul className="documents-list">
            {
                docs.map(doc => (
                    <DocumentPreview key={doc.id} document={doc} onClick={handleOpenDocument}/>
                ))
            }
            </ul>
        </div>
    );

};
export default DocumentsList;

