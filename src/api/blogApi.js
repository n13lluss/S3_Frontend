import api from './api';

const blogApi = {
  getAllBlogs: async (token) => {
    try {
      const response = await api.Blog.get('/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getBlogById: async (id) => {
    try {
      const response = await api.Blog.get(`/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createBlog: async (formData, token) => {
    try {
      const response = await api.Blog.post('/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateBlogById: async (id, updatedBlogData, token) => {
    try {
      const response = await api.Blog.put(`/${id}`, updatedBlogData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteBlogById: async (id, token) => {
    try {
      const response = await api.Blog.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

const handleApiError = (error) => {
  if (error.response && error.response.status === 401) {
    // Clear the token from localStorage if the response status is 401
    localStorage.removeItem('accessToken');
    window.location.reload();
  }
  throw error;
};

export default blogApi;
