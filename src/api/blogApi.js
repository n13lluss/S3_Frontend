import api from './api';
import signalRService from '../api/signalRService';

const blogApi = {
  getAllBlogs: async (idString) => {
    try {
      let response;
      if (idString) {
        response = await api.Blog.get('/', { params: { idString } });
      } else {
        response = await api.Blog.get('/');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  },

  // Modify createBlog method to wait for SignalR connection
  createBlog: async (formData, token) => {
    try {
      await signalRService.start(); // Ensure SignalR connection is established
      const response = await api.Blog.post('/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  },

  // Modify updateBlogById method to wait for SignalR connection
  updateBlogById: async (id, updatedBlogData, token) => {
    try {
      await signalRService.start(); // Ensure SignalR connection is established
      const response = await api.Blog.put(`/${id}`, updatedBlogData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Modify deleteBlogById method to wait for SignalR connection
  deleteBlogById: async (id, token) => {
    try {
      await signalRService.start(); // Ensure SignalR connection is established
      const response = await api.Blog.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  },

  likeBlog: async (id, token, username) => {
    try {
      await signalRService.start(); // Ensure SignalR connection is established
      await signalRService.connection.invoke("SendBlogUpdate", "A blog is being liked.");
      const response = await api.Blog.post(`/${id}/like`, `"${username}"`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      signalRService.connection.invoke("SendBlogUpdate", "A blog has been liked.");
  
      return response.data;
    } catch (error) {
      console.error('Error liking blog:', error);
      throw error; // Add this line to propagate the error
    }
  },  
};

export default blogApi;
