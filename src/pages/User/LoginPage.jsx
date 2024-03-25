import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../../api/userApi';
import './loginpage.css';
import bcrypt from 'bcryptjs';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameEmail: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10); // Hash the password before sending it to the backend
      const dataToSend = { ...formData, password: hashedPassword }; // Replace the plain text password with the hashed one
      await userApi.login(dataToSend);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email:
            <input
              type="text"
              name="usernameEmail"
              value={formData.usernameEmail}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
