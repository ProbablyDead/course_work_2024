export default class LatexDocument {
    id: string;
    name: string;
    text?: string;

    constructor(id: string, name: string, text?:string) {
        this.id = id;
        this.name = name;
        this.text = text;
    }
}
