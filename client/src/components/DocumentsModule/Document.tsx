import React, { useCallback } from 'react';
import LatexDocument from '../../ts/classes/LatexDocument.class';
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
    const handleSave = useCallback(() => {
        const name = document.getElementById("name")?.innerText;
        const text = document.getElementById("text")?.innerText;
        
        if (!name || name.length === 0) {
            errorOccured("Enter document name");
            return;
        }

        doc.name = name;
        doc.text = text;

        onChange(doc);
    }, [doc, errorOccured, onChange]);

    return (
        <div className="document-details">
            <h1>{doc.isPrivate ? "Private" : "Public"}</h1>
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
                <h3 
                    id="name"
                    className="document-name"
                    suppressContentEditableWarning
                    contentEditable={doc.isPrivate}>
                    {doc.name}
                </h3> 
                <p id="text" 
                    suppressContentEditableWarning
                    contentEditable={doc.isPrivate} 
                    className="document-text">{doc.text || 'No text available'}
                </p>
            </div>
        </div>
    );
};

export default Document;
