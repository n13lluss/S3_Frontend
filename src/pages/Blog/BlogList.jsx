import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogApi from '../../api/blogApi';
import './bloglist.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token")
        const fetchedBlogs = await blogApi.getAllBlogs(token);

        // Sort blogs by posted_On in descending order
        const sortedBlogs = fetchedBlogs.sort((a, b) => new Date(b.posted_On) - new Date(a.posted_On));

        setBlogs(sortedBlogs);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <div className='blog-page_container'>
      <h2 className='blog-page_title'>Blogs</h2>

      {loading && <p className='blog-page_loading-text'>Loading blogs...</p>}

      {error && (
        <div>
          <p className='blog-page_error-text'>Error fetching blogs. Please try again later.</p>
          {/* You can provide more detailed error information if needed */}
          <p>{error.message}</p>
        </div>
      )}

      {!loading && !error && (
        <section className='blog-page_post-container'>
          {blogs.map(blog => (
            <div className='blog-post_container' key={blog.id}>
              <h3 className='blog-post_name'>{blog.name}</h3>
              <p className='blog-post_description'>{blog.description}</p>
              <p className='blog-post_posted'>Posted by {blog.user_Name} on {new Date(blog.posted_On).toLocaleString()}</p>
              <p className='blog-post_likes'>Likes: {blog.likes}</p>

              {/* Visit Blog button */}
              <Link to={`/blogs/${blog.id}`}>
                <button className='blog-post_visit'>Visit Blog</button>
              </Link>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default BlogList;