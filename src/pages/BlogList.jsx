// BlogList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogApi from '../api/blogApi';  // Make sure the import is correct

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
        try {
          const fetchedBlogs = await blogApi.getAllBlogs();
      
          // Sort blogs by posted_On in descending order
          const sortedBlogs = fetchedBlogs.sort((a, b) => new Date(b.posted_On) - new Date(a.posted_On));
      
          setBlogs(sortedBlogs);
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };

    fetchBlogs();
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <div key={blog.id}>
          <h3>{blog.name}</h3>
          <p>{blog.description}</p>
          <p>Posted by {blog.user_Name} on {new Date(blog.posted_On).toLocaleString()}</p>
          <p>Likes: {blog.likes}</p>
          
          {/* Visit Blog button */}
          <Link to={`/blogs/${blog.id}`}>
            <button>Visit Blog</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
