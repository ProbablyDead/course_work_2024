import UserAPIProps from "../../interfaces/API/User_API.interface";
import User from "../User.class";
import API from "./API.class";

export default class UserAPI extends API implements UserAPIProps {
    private setUser: (user: User) => void;

    public constructor(setUser: (user: User) => void) {
        super();
        this.setUser = setUser;
        this.prefix = "user";
    }

    public loginUser(username: string, password: string,
                     success: () => void, error: (message: string) => void) {
        this.sendPOSTRequest(`${this.prefix}/login`,
                             {"username": username, "password": password},
                             () => {this.setUser(new User(username, password)); success();},
                                 error);
    }

    public registerUser(username: string, password: string,
                        success: () => void, error: (message: string) => void) {
        this.sendPOSTRequest(`${this.prefix}/signup`, 
                             {"username": username, "password": password},
                             () => {this.setUser(new User(username, password)); success();},
                                 error);
    }
}
