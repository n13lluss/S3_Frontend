import api from './api';

export const isLoggedIn = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return false;
  }
  return true;
};

const setToken = (token) => {
  // Check if the token is present
  if (!token) {
    throw new Error('Invalid token value in the server response.');
  }

  // Set the token in localStorage
  localStorage.setItem('accessToken', token);
};

const userApi = {
  register: async (userData) => {
    try {
      const response = await api.User.post('/Register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.User.post('/Login', credentials);
      console.log('Server response:', response);

      const { token } = response.data;
      console.log('Token:', token);


      // Ensure the token is defined before storing in localStorage
      if (token) {
        // Store the token in localStorage
        setToken(token);
        window.location.reload()
        return response.data;
      } else {
        throw new Error('Token is missing in the response.');
      }
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      // Clear tokens from localStorage on logout
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      return { message: 'Logout successful' };
    } catch (error) {
      throw error;
    }
  },
};

export default userApi;
