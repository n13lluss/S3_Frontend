import api from './api';

const userApi = {
  createUser: async (userData) => {
    try {
      const response = await api.User.post('/Register', {
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
