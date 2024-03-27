import api from './api';

const blogApi = {
  getAllBlogs: async (idString) => {
    try {
      var response;
      if (idString!=="" && idString!==null && idString!==undefined) {
        response = await api.Blog.get('/', {
          params: {
            idString: idString
          }
        });
      }else{
        response = await api.Blog.get('/');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  },
  

  getBlogById: async (id) => {
    try {
      const response = await api.Blog.get(`/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching blog:', error);
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
      console.error('Error creating blog:', error);
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
      console.error('Error updating blog:', error)
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
      console.error('Error deleting blog:', error)
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
        console.error('Error liking blog:', error);
    }
  },
};

export default blogApi;
