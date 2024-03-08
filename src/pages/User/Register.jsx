import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../../api/userApi';
import './register.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (e) => {
    const { name } = e.target;

    if (formData[name].length > 1) {
      setPasswordError(`Please make sure your ${name} is correct.`);
      setUsernameError(null);
      setEmailError(null);
    } else {
      setPasswordError(null);

      if (name === 'username') {
        setUsernameError('Please enter a valid username.');
        setEmailError(null); // Clear email error
      } else if (name === 'email') {
        setEmailError('Please enter a valid email.');
        setUsernameError(null); // Clear username error
      } else {
        setUsernameError(null);
        setEmailError(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if username is too short
    if (formData.username.length < 3) {
      setUsernameError('Username is too short');
      return;
    } else {
      setUsernameError(null);
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError(null);
    }

    try {
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Passwords don't match");
        return;
      }

      // Validate password length and special characters using regex
      const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        setPasswordError(
          'Password must be at least 8 characters long and contain special characters except @.'
        );
        return;
      }

      // Call the register API endpoint
      await userApi.register(formData);
      // Navigate to the home page after a successful registration
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </label>
          {usernameError && <p className="validation-error">{usernameError}</p>}
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </label>
          {emailError && <p className="validation-error">{emailError}</p>}
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </label>
          {passwordError && <p className="password-error">{passwordError}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
