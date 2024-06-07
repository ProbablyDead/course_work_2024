import PrivateDocumentsAPIProps from "../../interfaces/API/PrivateDocuments_API.interface";
import LatexDocument from "../LatexDocument.class";
import User from "../User.class";
import API from "./API.class";

export default class PrivateDocumentsAPI extends API implements PrivateDocumentsAPIProps {
    private user: User;
    public getUsername(): string {
        return this.user.getUserStruct().username;
    }

    public constructor(user: User) {
        super();
        this.user = user;
        this.prefix = "documents";
    }

    public getDocumentsList(success: (docs: LatexDocument[]) => void, error: (message: string) => void): void {
        this.sendPOSTRequest(`${this.prefix}/private`, this.user.getUserStruct(), success, error);
    }

    public getDocumentByID(id: string, success: (doc: LatexDocument) => void, error: (message: string) => void): void {
        this.sendPOSTRequest(`${this.prefix}/private/${id}`, this.user.getUserStruct(), success, error);
    }

    public addPrivateDocument(name: string, text: string, success: (docs: LatexDocument[]) => void, error: (message: string) => void): void {
        throw new Error("Method not implemented.");
    }

    public updatePrivateDocument(doc: LatexDocument, success: (docs: LatexDocument[]) => void, error: (message: string) => void): void {
        throw new Error("Method not implemented.");
    }

    public deletePrivateDocument(id: string, success: (docs: LatexDocument[]) => void, error: (message: string) => void): void {
        throw new Error("Method not implemented.");
    }
}
