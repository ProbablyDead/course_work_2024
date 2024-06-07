import PrivateDocumentsAPIProps from "../../interfaces/API/PrivateDocuments_API.interface";
import LatexDocument from "../LatexDocument.class";
import User from "../User.class";
import API from "./API.class";

export default class PrivateDocumentsAPI extends API implements PrivateDocumentsAPIProps {
    private user: User;

    public constructor(user: User) {
        super();
        this.user = user;
        this.prefix = "documents";
    }

    public getDocumentsList(success: (docs: LatexDocument[]) => void, error: (message: string) => void): void {
    }

    public getDocumentByID(id: string, success: (doc: LatexDocument) => void, error: (message: string) => void): void {
    }
}
