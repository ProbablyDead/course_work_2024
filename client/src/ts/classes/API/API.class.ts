export default class API {
    private static ADDRESS: String = "http://89.110.71.22/api/";

    private sendRequest(promise: Promise<Response>, 
                        success: (result: any) => void, error: (message: string) => void) {
        promise
        .then(res => {
            if (res.ok) {
                res.json().then(text => success(text));
            } else {
                res.text().then(text => {
                    const error_message = JSON.parse(text);
                    error(error_message.detail ? error_message.detail : "An error occured.");
                })
            }
        });
    }

    protected sendGETRequest(path: string, 
                             success: (result: any) => void, error: (message: string) => void) {
        this.sendRequest(fetch(API.ADDRESS + path), success, error);
    }

    protected sendPOSTRequest(path: string, post_data: any, 
                              success: (result: any) => void, error: (message: string) => void) {
        this.sendRequest(fetch(API.ADDRESS + path, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post_data)
                }), success, error);
    }
}
