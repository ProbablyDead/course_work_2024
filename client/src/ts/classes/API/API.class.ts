import LatexDocument from "../LatexDocument.class";

export default class API {
    private static ADDRESS: string = "http://89.110.71.22/api/";
    protected prefix: string = "";

    private sendRequest(promise: Promise<Response>,
                        success: (data: unknown) => void, error: (message: string) => void) {
        promise
        .then(res => {
            if (res.ok) {
                res.json().then(data => {success(data)});
            } else {
                res.text().then(text => {
                    const error_message = JSON.parse(text);
                    error(error_message.detail ? error_message.detail : "An error occured.");
                })
            }
        });
    }

    protected parseDocument(data: unknown): LatexDocument {
        return Object.assign(new LatexDocument(), data);
    }

    protected parseDocumentsArray(data: unknown): LatexDocument[] {
        return (data as unknown[]).map(this.parseDocument);
    }

    protected sendGETRequest(path: string,
                             success: (data: unknown) => void, error: (message: string) => void) {
        this.sendRequest(fetch(API.ADDRESS + path), success, error);
    }

    protected sendPOSTRequest(path: string, post_data: unknown, 
                              success: (data: unknown) => void, error: (message: string) => void) {
        this.sendRequest(fetch(API.ADDRESS + path, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify(post_data)
                }), success, error);
    }

    protected getPDF(text: string, success: (file: unknown) => void) {
        fetch(API.ADDRESS + "documents/generate_docx", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"text": text})
        }).then(success);
    }
}
