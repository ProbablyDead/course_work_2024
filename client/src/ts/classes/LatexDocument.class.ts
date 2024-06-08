export default class LatexDocument {
    private _id: string;
    public set id(value: string) { this._id = value; }
    public get id(): string { return this._id; }

    private _name: string;
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    private _text?: string | undefined;
    public get text(): string | undefined { return this._text; }
    public set text(value: string | undefined) { this._text = value; }

    private _isPrivate: boolean = false;
    public get isPrivate(): boolean { return this._isPrivate; }
    public set isPrivate(value: boolean) { this._isPrivate = value; }

    constructor(id?: string, name?: string, text?:string) {
        this._id = id ? id : "";
        this._name = name ? name : "";
        this._text = text;
    }

    public getStruct()  {
        return {"id": this.id, "name": this.name, "text": this.text};
    }
}
