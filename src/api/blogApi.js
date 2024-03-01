import api from './api';

const blogApi = {
  getAllBlogs: async () => {
    try {
      const response = await api.Blog.get();
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBlogById: async (id) => {
    try {
      const response = await api.Blog.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createBlog: async (blogData) => {
    try {
      const response = await api.Blog.post('/', blogData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateBlogById: async (id, updatedBlogData) => {
    try {
      const response = await api.Blog.put(`/${id}`, updatedBlogData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteBlogById: async (id) => {
    try {
        console.log(id)
      const response = await api.Blog.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default blogApi;
