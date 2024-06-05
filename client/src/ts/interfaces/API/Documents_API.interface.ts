import LatexDocument from "../../classes/LatexDocument.class";

export default interface DocumentsAPIProps {
    getDocumentsList(): LatexDocument[];
}
