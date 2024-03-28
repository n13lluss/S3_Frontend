import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import blogApi from '../../api/blogApi';
import './bloglist.css';

const BlogList = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLike = async (id, idString, liked) => {
    try {
      const token = await getAccessTokenSilently();
      await blogApi.likeBlog(id, token, idString);
      // Refetch blogs after a successful like
      fetchBlogs();
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      let fetchedBlogs = [];
      const authentication = isAuthenticated;
      setTimeout(async () => {
        if (authentication) {
          fetchedBlogs = await blogApi.getAllBlogs(user.sub);
        } else {
          fetchedBlogs = await blogApi.getAllBlogs();
        }
        if (!fetchedBlogs) {
          setLoading(false);
          setError(new Error('No blogs found'));
          return;
        }
        const sortedBlogs = fetchedBlogs.sort(
          (a, b) => new Date(b.posted_On) - new Date(a.posted_On) 
        );
        setBlogs(sortedBlogs);
        setLoading(false);
      }, 200);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogs();
    }
    fetchBlogs();
  }, [isAuthenticated]); // Fetch blogs again when authentication status changes

  return (
    <div className='blog-page_container'>
      <h2 className='blog-page_title'>Blogs</h2>

      {loading && <p className='blog-page_loading-text'>Loading blogs...</p>}

      {error && (
        <div className='blog-page_error-text'>
          Error fetching blogs. Please try again later.
          {/* You can provide more detailed error information if needed */}
          <p>{error.message}</p>
        </div>
      )}

      {!loading && !error && (
        <section className='blog-page_post-container'>
          {blogs.map((blog) => (
            <div className='blog-post_container' key={blog.id}>
              <h3 className='blog-post_name'>{blog.name}</h3>
              <p className='blog-post_description'>{blog.description}</p>
              <p className='blog-post_posted'>
                Posted by {blog.user_Name} on{' '}
                {new Date(blog.posted_On).toLocaleString()}
              </p>
              <p className='blog-post_likes'>Likes: {blog.likes}</p>
              <section className='blog_post-buttons-container'>
                <Link to={`/blogs/${blog.id}`}>
                  <button className='blog-post_visit'>Visit Blog</button>
                </Link>
                {isAuthenticated && (
                  <button
                    onClick={async () => handleLike(blog.id, (user.username || user.name), blog.liked)}
                    className={`blog-post_visit ${blog.liked ? 'unlike-button' : 'like-button'}`}
                  >
                    {blog.liked ? 'Unlike blog' : 'Like blog'}
                  </button>
                )}
              </section>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default BlogList;
