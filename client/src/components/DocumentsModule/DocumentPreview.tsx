import LatexDocument from "../../ts/classes/LatexDocument.class";
import './styles/DocumentPreview.css';

interface DocumentPreviewProps {
    document: LatexDocument;
    onClick: (id: string) => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({document, onClick}) => {
    return (
            <div className="document-preview" onClick={() => onClick(document.id)}>
                {document.name}
            </div>
           );
};

export default DocumentPreview;

