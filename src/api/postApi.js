import api from './api';

const postApi = {
    createPost: async (formData, token) => {
        console.log('Creating post:', formData);
        try {
            const response = await api.Post.post('/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                
            });
            return response.data;
        } catch (error) {
            console.error('Error creating post:', error);
        }
    },
    updatePost: async (id, updatedPostData, token) => {
        try {
            const response = await api.Post.put(`/${id}`, updatedPostData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating post:', error);
        }
    },
    deletePost: async (id, token) => {
        try {
            const response = await api.Post.delete(`/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    },
};

export default postApi;