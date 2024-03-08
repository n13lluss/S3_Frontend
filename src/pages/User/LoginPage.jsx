import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import
import userApi from '../../api/userApi';
import './loginpage.css';

const LoginPage = () => {
  const navigate = useNavigate();  // Updated hook
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
      // Call the login API endpoint
      await userApi.login(formData);
      // Navigate to the home page after a successful login
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
