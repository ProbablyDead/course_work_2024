import LatexDocument from "../../classes/LatexDocument.class";
import PublicDocumentsAPIProps from "./PublicDocuments_API.interface";

export default interface PrivateDocumentsAPIProps extends PublicDocumentsAPIProps {
    getUsername(): string;
    addPrivateDocument(name: string, text: string, success: (docs: LatexDocument[]) => void, error: (message: string) => void): void;
    updatePrivateDocument(doc: LatexDocument, success: (docs: LatexDocument[]) => void, error: (message: string) => void): void;
    deletePrivateDocument(id: string, success: (docs: LatexDocument[]) => void, error: (message: string) => void): void;
}
