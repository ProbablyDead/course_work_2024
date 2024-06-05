import User from "../../ts/classes/User.class";
import DocumentsAPIProps from "../../ts/interfaces/API/Documents_API.interface";

interface DocumentsListProps {
    API: DocumentsAPIProps;
}

const DocumentsList: React.FC<DocumentsListProps> = ({API}) => {
    if (!User.isLogined()) {
    }

    return (
            <div>DOCS</div>
           );
};

export default DocumentsList;

