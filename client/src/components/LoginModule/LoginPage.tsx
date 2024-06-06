import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserAPIProps from '../../ts/interfaces/API/User_API.interface';

interface LoginPageProps {
    userLogined: () => void;
    errorOccured: (message: string) => void;
    errorClosed: () => void;
    API: UserAPIProps;
};

function checkString(str: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(str);
};

function checkUsernameAndPassword(username: string, password: string, 
    errorOccured: (message: string) => void): boolean {
    if (!checkString(username)) {
        errorOccured("Username must contain only letters and numbers");
        return false;
    }
    if (!checkString(password)) {
        errorOccured("Password must contain only letters and numbers");
        return false;
    }
    return true;
};

const LoginPage: React.FC<LoginPageProps> = ({userLogined, errorOccured, errorClosed, API}) => {
    const successLogin = (data: any) => {
        console.log(`${JSON.stringify(data)}`);
        errorClosed();
        userLogined();
    };

    const handleLogin = (username: string, password: string) => {
        if (!checkUsernameAndPassword(username, password, errorOccured)) return;

        API.loginUser(username, password, successLogin, errorOccured);
    };

    const handleRegister = (username: string, password: string, confirmPassword: string) => {
        if (!checkUsernameAndPassword(username, password, errorOccured)) return;

        if (password !== confirmPassword) {
            errorOccured("Passwords do not match!");
            return;
        }

        API.registerUser(username, password, successLogin, errorOccured);
    };

    return (
      <div>
        <h1>GOST constructor</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <h2>Login</h2>
            <LoginForm onLogin={handleLogin} />
          </div>
          <div>
            <h2>Register</h2>
            <RegisterForm onRegister={handleRegister} />
          </div>
        </div>
      </div>
    );
};

export default LoginPage;

