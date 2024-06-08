import React, { useCallback } from 'react';
import LatexDocument from '../../ts/classes/LatexDocument.class';
import './styles/Document.css';

interface DocumentProps {
    doc: LatexDocument;
    onBack: () => void;
    onChange: (document: LatexDocument) => void;
    errorOccured: (message: string) => void;
}

const Document: React.FC<DocumentProps> = ({ doc, onBack, onChange, errorOccured}) => {
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
            <button className="button" onClick={onBack}>Back</button>
            {doc.isPrivate && <button className="button" onClick={handleSave}>Save</button>}
            <h1 
                id="name"
                className="document-name"
                suppressContentEditableWarning
                contentEditable={doc.isPrivate}>
                {doc.name}
            </h1> 
            <p id="text" contentEditable={doc.isPrivate} className="document-text">{doc.text || 'No text available'}</p>
        </div>
    );
};

export default Document;
