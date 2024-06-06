import UserAPIProps from "../../interfaces/API/User_API.interface";
import API from "./API.class";

export default class UserAPI extends API implements UserAPIProps {
    private static PREFIX: string = "user";

    public loginUser(username: string, password: string,
                     success: (username: string) => void, error: (message: string) => void) {
        this.sendPOSTRequest(`${UserAPI.PREFIX}/login`, {"username": username, "password": password}, success, error);
    }

    public registerUser(username: string, password: string,
                        success: (username: string) => void, error: (message: string) => void) {
        this.sendPOSTRequest(`${UserAPI.PREFIX}/signup`, {"username": username, "password": password}, success, error);
    }
}
