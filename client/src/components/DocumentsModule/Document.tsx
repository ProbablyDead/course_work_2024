import React from 'react';
import LatexDocument from '../../ts/classes/LatexDocument.class';
import './styles/Document.css';

interface DocumentProps {
    document: LatexDocument;
    onBack: () => void;
}

const Document: React.FC<DocumentProps> = ({ document, onBack }) => {
    return (
        <div className="document-details">
            <button className="back-button" onClick={onBack}>Back</button>
            <h1>{document.name}</h1>
            <p>{document.text || 'No text available'}</p>
        </div>
    );
};

export default Document;
