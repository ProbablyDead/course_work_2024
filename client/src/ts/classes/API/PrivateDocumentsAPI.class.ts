import PrivateDocumentsAPIProps from "../../interfaces/API/PrivateDocuments_API.interface";
import LatexDocument from "../LatexDocument.class";
import User from "../User.class";
import API from "./API.class";

export default class PrivateDocumentsAPI extends API implements PrivateDocumentsAPIProps {
    private user: User;
    private addPrivateFieldToDocument(doc: LatexDocument): LatexDocument {
        doc.isPrivate = true;
        return doc;
    }

    public getUsername(): string {
        return this.user.getStruct().username;
    }

    public constructor(user: User) {
        super();
        this.user = user;
        this.prefix = "documents";
    }

    public getDocumentsList(success: (docs: LatexDocument[]) => void, error: (message: string) => void): void {
        this.sendPOSTRequest(`${this.prefix}/private`, this.user.getStruct(), 
                             (documents: unknown) => { success(this.parseDocumentsArray(documents).map(this.addPrivateFieldToDocument)); } , error);
    }

    public getDocumentByID(id: string, success: (doc: LatexDocument) => void, error: (message: string) => void): void {
        this.sendPOSTRequest(`${this.prefix}/private/${id}`, this.user.getStruct(),
                             (documents: unknown) => { success(this.addPrivateFieldToDocument(this.parseDocument(documents))); } , error);
    }

    public addPrivateDocument(name: string, text: string, success: (document: LatexDocument) => void, error: (message: string) => void): void {
        this.sendPOSTRequest(`${this.prefix}/add/private`, {...this.user.getStruct(), ...{"name": name, "text": text}}, 
                             (document: unknown) => {success(this.addPrivateFieldToDocument(this.parseDocument(document)))}, error);
    }

    public updatePrivateDocument(doc: LatexDocument, success: () => void, error: (message: string) => void): void {
        this.sendPOSTRequest(`${this.prefix}/update/private`, {...this.user.getStruct(), ...doc.getStruct()}, success , error);
    }

    public deletePrivateDocument(id: string, success: () => void, error: (message: string) => void): void {
        this.sendPOSTRequest(`${this.prefix}/delete/private`, {...this.user.getStruct(), ...{"id": id}}, success , error);
    }

    public getPDFDocument(text: string, success: (response: unknown) => void): void{
        this.getPDF(text, success);
    }
}
