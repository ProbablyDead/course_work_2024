import DocumentPreview from "./DocumentPreview";
import LatexDocument from "../../ts/classes/LatexDocument.class";
import "./styles/DocumentList.css";

interface DocumentsListProps {
    name: string;
    docs: LatexDocument[];
    handleOpenDocument: (id: string) => void;
};

const DocumentsList: React.FC<DocumentsListProps> = ({name, docs, handleOpenDocument}) => {
    return (
        <div className="documents-list-container">
            <h3 className="documents-list-header">{name}</h3>
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

