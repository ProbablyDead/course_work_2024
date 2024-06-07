export default interface UserAPIProps {
    loginUser(username: string, password: string, success: () => void, error: (message: string) => void): void;
    registerUser(username: string, password: string, success: () => void, error: (message: string) => void): void;
}
