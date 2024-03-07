import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogApi from '../../api/blogApi';
import './blogcreate.css';

const BlogCreate = () => {
  const navigate = useNavigate();
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
      navigate('/blogs');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className='blog-create_page'>
      <div className='blog-create_container'>
        <h2 className='blog-create_name'>Create Blog</h2>
        <form className='blog-create_form' onSubmit={handleSubmit}>
          <label className='blog-create_label'>
            Name:
            <input
              className='blog-create_input'
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className='blog-create_label'>
            Description:
            <textarea
              className='blog-create_textarea'
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          {/* Add other form fields as needed */}
          <button className='blog-create_button' type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default BlogCreate;
