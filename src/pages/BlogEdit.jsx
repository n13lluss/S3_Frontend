import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import blogApi from '../api/blogApi';
import './blogedit.css';

const BlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogApi.getBlogById(id);
        setBlog(response);
        setFormData({
          name: response?.name || '',
          description: response?.description || '',
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogApi.updateBlogById(id, formData);
      // Redirect to the blog view page using useNavigate
      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
      // Handle the error, show a message, or perform other actions
    }
  };

  return (
    <div className='blog-edit_page'>
      {blog ? (
        <div className='blog-edit_container'>
          <h2 className='blog-edit_name'>Edit Blog</h2>
          <form className='blog-edit_form' onSubmit={handleSubmit}>
            <label className='blog-edit_label'>
              Name:
              <input
                className='blog-edit_input'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label className='blog-edit_label'>
              Description:
              <textarea
                className='blog-edit_textarea'
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <button className='blog-edit_button' type="submit">Save Changes</button>
          </form>
          <Link to={`/blogs/${blog.id}`}>
            <button className='blog-edit_button blog-edit_button_cancel'>Cancel</button>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogEdit;
