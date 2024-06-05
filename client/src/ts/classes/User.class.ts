export default class User {
    private static _instance: User = new User();

    private isLogined: boolean = false;
    private username: string = "";
    private password: string = ""

    public static setUser(username: string, password: string) {
        this._instance.username = username;
        this._instance.password = password;
        this._instance.isLogined = true;
    }

    public static getUser(): User {
        return this._instance;
    }

    public static getUsername(): string {
        return this._instance.username;
    }

    public static getPassword(): string {
        return this._instance.password;
    }

    public static isLogined(): boolean {
        return this._instance.isLogined;
    }
}
