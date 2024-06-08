export default class User {
    private username: string;
    private password: string;

    public constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    public getStruct() {
        return {"username": this.username, "password": this.password};
    }
}
