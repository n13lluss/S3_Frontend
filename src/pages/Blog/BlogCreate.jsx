import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook
import './blogcreate.css';
import blogApi from '../../api/blogApi';

const BlogCreate = ({ onSubmit }) => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0(); // Destructure getAccessTokenSilently from useAuth0 hook
  const [formData, setFormData] = useState({
    userName: `${user.name}`,
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Get access token from Auth0
      const accessToken = await getAccessTokenSilently();
      const result = await blogApi.createBlog(formData, accessToken);
      navigate(`/blogs/${result.id}`);
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
};

export default BlogCreate;
