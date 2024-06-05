export default class API {
    private static ADDRESS: String = "http://89.110.71.22:8000/api/";

    private sendRequest(promise: Promise<Response>, success: (result: any) => void, error: (message: string) => void) {
                promise
                .then(res => console.log(JSON.stringify(res)))
                .catch(err => error((err as Error).message));
    }

    protected sendGETRequest(path: string, success: (result: any) => void, error: (message: string) => void) {
        this.sendRequest(fetch(API.ADDRESS + path), success, error)
    }

    protected sendPOSTRequest(path: string, post_data: any, success: (result: any) => void, error: (message: string) => void) {
        this.sendRequest(fetch(API.ADDRESS + path, {
                    mode: 'no-cors',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post_data)
                }), success, error);
    }
}
