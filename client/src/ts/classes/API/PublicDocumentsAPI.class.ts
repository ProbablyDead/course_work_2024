import PublicDocumentsAPIProps from "../../interfaces/API/PublicDocuments_API.interface";
import LatexDocument from "../LatexDocument.class";
import API from "./API.class";

export default class PublicDocumentsAPI extends API implements PublicDocumentsAPIProps {
    public constructor() {
        super();
        this.prefix = "documents";
    }

    public getDocumentsList(success: (docs: LatexDocument[]) => void, error: (message: string) => void): void {
        this.sendGETRequest(`${this.prefix}/public`, ((docs: any) => {
            success(this.parseDocuments(docs));
        }), error);
    }

    public getDocumentByID(id: string, success: (doc: LatexDocument) => void, error: (message: string) => void): void {
        this.sendGETRequest(`${this.prefix}/public/${id}`, ((doc: any) => {
            success(this.parseDocument(doc));
        }), error);
    }
}
