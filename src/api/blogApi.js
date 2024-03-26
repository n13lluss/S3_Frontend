import api from './api';

const blogApi = {
 
  getAllBlogs: async (username) => {
    try {
      var response;
      if (username) {
        response = await api.Blog.get('/', username);
      }else{
        response = await api.Blog.get('/');
      }
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  

  getBlogById: async (id) => {
    try {
      const response = await api.Blog.get(`/${id}`);
      return response;
    } catch (error) {
      return error.response;
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

  likeBlog: async (id, token, username) => {
    try {
        const response = await api.Blog.put(`/${id}/like`, `"${username}"`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
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
