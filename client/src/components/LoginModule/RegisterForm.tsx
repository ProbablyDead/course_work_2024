import React, { useState } from 'react';
import './LoginPage.css';

interface RegisterFormProps {
  onRegister: (username: string, password: string, confirmPassword: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onRegister(username, password, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className='form-label'>Username:</label>
        <input
          className='form-input'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className='form-label'>Password:</label>
        <input
          className='form-input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label className='form-label'>Confirm Password:</label>
        <input
          className='form-input'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button className='btn' type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;

