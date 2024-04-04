import api from './api';

const userApi = {
  createUser: async (userData) => {
    console.log(userData);
    try {
      const response = await api.User.post('/register', {
        name: userData.name,
        email: userData.email,
        IdString: userData.IdString,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userApi;
