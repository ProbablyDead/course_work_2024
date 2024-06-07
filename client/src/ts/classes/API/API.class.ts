import LatexDocument from "../LatexDocument.class";

export default class API {
    private static ADDRESS: string = "http://89.110.71.22/api/";
    protected prefix: string = "";

    private sendRequest(promise: Promise<Response>, 
                        success: (data: any) => void, error: (message: string) => void) {
        promise
        .then(res => {
            if (res.ok) {
                res.json().then(text => {success(text)});
            } else {
                res.text().then(text => {
                    const error_message = JSON.parse(text);
                    error(error_message.detail ? error_message.detail : "An error occured.");
                })
            }
        });
    }

    protected sendGETRequest(path: string, 
                             success: (data: any) => void, error: (message: string) => void) {
        this.sendRequest(fetch(API.ADDRESS + path), success, error);
    }

    protected sendPOSTRequest(path: string, post_data: any, 
                              success: (data: any) => void, error: (message: string) => void) {
        this.sendRequest(fetch(API.ADDRESS + path, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post_data)
                }), success, error);
    }

    protected parseDocuments(data: any): LatexDocument[] {
        return (data as any[]).map(obj => {
            const text = obj.hasOwnProperty('text') ? obj.text : undefined;
            return new LatexDocument(obj.id, obj.name, text);
        });
    }

    protected parseDocument(data: any): LatexDocument {
        return this.parseDocuments([data])[0];
    }
}
