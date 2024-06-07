import LatexDocument from "../../classes/LatexDocument.class";

export default interface PublicDocumentsAPIProps {
    getDocumentsList(success: (docs: LatexDocument[]) => void, error: (message: string) => void): void;
    getDocumentByID(id: string, success: (doc: LatexDocument) => void, error: (message: string) => void): void;
}
