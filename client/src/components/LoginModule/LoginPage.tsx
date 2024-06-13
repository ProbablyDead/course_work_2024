import './LoginPage.css';
import React, { useCallback } from 'react';
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
    return /^[a-zA-Z0-9_-]+$/.test(str);
};

function checkUsernameAndPassword(username: string, password: string, 
    errorOccured: (message: string) => void): boolean {
    const reqs: string = "must contain only letters, numbers, '-', '_' and '!'";
    if (!checkString(username)) {
        errorOccured("Username " + reqs);
        return false;
    }
    if (!checkString(password)) {
        errorOccured("Password " + reqs);
        return false;
    }
    return true;
};

const LoginPage: React.FC<LoginPageProps> = ({userLogined, errorOccured, errorClosed, API}) => {
    const successLogin = useCallback(() => {
        errorClosed();
        userLogined();
    }, [errorClosed, userLogined]);

    const handleLogin = useCallback((username: string, password: string) => {
        if (!checkUsernameAndPassword(username, password, errorOccured)) return;

        API.loginUser(username, password, successLogin, errorOccured);
    }, [successLogin, errorOccured, API]);

    const handleRegister = useCallback((username: string, password: string, confirmPassword: string) => {
        if (!checkUsernameAndPassword(username, password, errorOccured)) return;

        if (password !== confirmPassword) {
            errorOccured("Passwords do not match!");
            return;
        }

        API.registerUser(username, password, successLogin, errorOccured);
    }, [successLogin, errorOccured, API]);

    return (
      <div>
        <h1>GOST constructor</h1>
        <div className='container' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div className='form-group'>
            <h2>Login</h2>
            <LoginForm onLogin={handleLogin} />
          </div>
          <div className='form-group'>
            <h2>Register</h2>
            <RegisterForm onRegister={handleRegister} />
          </div>
        </div>
      </div>
    );
};

export default LoginPage;

