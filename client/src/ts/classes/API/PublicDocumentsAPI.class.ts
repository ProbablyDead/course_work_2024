import PublicDocumentsAPIProps from "../../interfaces/API/PublicDocuments_API.interface";
import LatexDocument from "../LatexDocument.class";
import API from "./API.class";

export default class PublicDocumentsAPI extends API implements PublicDocumentsAPIProps {
    public constructor() {
        super();
        this.prefix = "documents";
    }

    public getDocumentsList(success: (docs: LatexDocument[]) => void, error: (message: string) => void): void {
        this.sendGETRequest(`${this.prefix}/public`, (data: unknown) => { success(this.parseDocumentsArray(data)); }, error);
    }

    public getDocumentByID(id: string, success: (doc: LatexDocument) => void, error: (message: string) => void): void {
        this.sendGETRequest(`${this.prefix}/public/${id}`, (data: unknown) => { success(this.parseDocument(data)); }, error);
    }

    public getPDFDocument(text: string, success: (response: unknown) => void): void{
        this.getPDF(text, success);
    }
}
