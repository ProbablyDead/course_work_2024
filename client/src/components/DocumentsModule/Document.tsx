import React, { useCallback, useRef } from 'react';
import LatexDocument from '../../ts/classes/LatexDocument.class';
import DocumentText from './DocumentText';
import './styles/Document.css';

interface DocumentProps {
    doc: LatexDocument;
    onBack: () => void;
    onChange: (document: LatexDocument) => void;
    onCreateNew: (document: LatexDocument) => void;
    onDelete: (document: LatexDocument) => void;
    errorOccured: (message: string) => void;
}

const Document: React.FC<DocumentProps> = ({ doc, onBack, onChange, onCreateNew, onDelete, errorOccured}) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleSave = useCallback(() => {
        const name = document.getElementById("name")?.innerText;
        
        if (!name || name.length === 0) {
            errorOccured("Enter document name");
            return;
        }

        doc.name = name;
        doc.text = ref.current?.innerHTML;

        onChange(doc);
    }, [doc, errorOccured, onChange]);

    return (
        <div className="document-details">
            <div>
                <button className="button" onClick={onBack}>Back</button>
                {
                    doc.isPrivate ? (
                    <>
                        <button className="button" onClick={handleSave}>Save</button>
                        <button className="button" onClick={() => onDelete(doc)}>Delete</button>
                    </>
                    ) : (
                        <button className="button" onClick={() => onCreateNew(doc)}>Create private</button>
                    )
                }
                <h1>{`${doc.isPrivate ? "Private" : "Public"}: `}</h1>
                <h1 
                    id="name"
                    className="document-name"
                    suppressContentEditableWarning
                    contentEditable={doc.isPrivate}>
                    <b>{doc.name}</b>
                </h1>
                <DocumentText
                    text={doc.text || ""}
                    ref={ref}
                    isEditable={doc.isPrivate}
                />
            </div>
        </div>
    );
};

export default Document;
