import React from 'react';
import './ErrorMessage.css'; 

interface ErrorMessageProps {
    message: string;
    show: boolean;
    handleClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, show, handleClose }) => {
    if (!show) return null;

    return (
        <div className="error-message">
            <p>{message}</p>
             <button onClick={handleClose} className="close-button">
                Close
            </button>
        </div>
    );
};

export default ErrorMessage;

