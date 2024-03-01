import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import blogApi from '../api/blogApi';

const BlogEdit = () => {
  const { id } = useParams();
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
      // Redirect to the blog view page or handle as needed
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div>
      {blog ? (
        <div>
          <h2>Edit Blog</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
              Description:
              <textarea name="description" value={formData.description} onChange={handleChange} />
            </label>
            <button type="submit">Save Changes</button>
          </form>
          <Link to={`/blogs/${blog.id}`}>
            <button>Cancel</button>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogEdit;
