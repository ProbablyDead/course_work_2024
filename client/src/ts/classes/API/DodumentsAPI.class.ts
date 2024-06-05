import DocumentsAPIProps from "../../interfaces/API/Documents_API.interface";
import LatexDocument from "../LatexDocument.class";
import API from "./API.class";

export default class DocumentsAPI extends API implements DocumentsAPIProps {
    private PREFIX: string = "documents";

    public getDocumentsList (): LatexDocument[] {
        return [];
    }
}
