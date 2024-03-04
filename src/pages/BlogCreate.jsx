import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogApi from '../api/blogApi';

const BlogCreate = () => {
  const navigate = useNavigate();  // Initialize the useNavigate hook
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogApi.createBlog(formData);
      // Redirect to the blog list page
      navigate('/blogs');  // Replace '/blog-list' with the actual route
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        {/* Add other form fields as needed */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default BlogCreate;
