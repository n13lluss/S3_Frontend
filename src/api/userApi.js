import api from './api';

const userApi = {
  register: async (userData) => {
    try {
      const response = await api.User.post('/Register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userApi;
