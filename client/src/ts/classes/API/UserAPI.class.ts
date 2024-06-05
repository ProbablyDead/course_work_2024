import UserAPIProps from "../../interfaces/API/User_API.interface";
import User from "../User.class";
import API from "./API.class";

export default class UserAPI extends API implements UserAPIProps {
    private PREFIX: string = "user";

    public loginUser(username: string, password: string,
                     success: (username: string) => void, error: (message: string) => void) {
        // this.sendPOSTRequest("user/signup", {"username": username, "password": password}, success, error);
        this.sendGETRequest("documents/public", success, error);
    }

    public registerUser(username: string, password: string,
                        success: (username: string) => void, error: (message: string) => void) {
        // this.sendRequest("user/add");
    }
}
