import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import blogApi from '../../api/blogApi';
import signalRService from '../../api/signalRService';
import './bloglist.css';

const BlogList = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      let fetchedBlogs = [];
      if (isAuthenticated && user && user.sub) {
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
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError(error);
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    signalRService.start();
    signalRService.onReceiveBlogUpdate(handleBlogUpdate);
    return () => {
      signalRService.stop();
      signalRService.offReceiveBlogUpdate();
    };
  }, []);

  const handleBlogUpdate = (message) => {
    fetchBlogs();
  };

  const handleLike = async (id, idString, liked) => {
    try {
      const token = await getAccessTokenSilently();
      await blogApi.likeBlog(id, token, idString);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => {
          if (blog.id === id) {
            return {
              ...blog,
              liked: !liked,
              likes: liked ? blog.likes - 1 : blog.likes + 1,
            };
          }
          return blog;
        })
      );
    } catch (error) {
      console.error('Error liking blog:', error);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => {
          if (blog.id === id) {
            return { ...blog, liked: liked };
          }
          return blog;
        })
      );
    }
  };

  return (
    <div className="blog-page_container">
      <h2 className="blog-page_title">Blogs</h2>

      {loading && <p className="blog-page_loading-text">Loading blogs...</p>}

      {error && (
        <div className="blog-page_error-text">
          Error fetching blogs. Please try again later.
          <p>{error.message}</p>
        </div>
      )}

      {!loading && !error && (
        <section className="blog-page_post-container">
          {blogs.map((blog) => (
            <div className="blog-post_container" key={blog.id}>
              <h3 className="blog-post_name">{blog.name}</h3>
              <p className="blog-post_description">{blog.description}</p>
              <p className="blog-post_posted">
                Posted by {blog.user_Name} on{' '}
                {new Date(blog.posted_On).toLocaleString()}
              </p>
              <p className="blog-post_likes">Likes: {blog.likes}</p>
              <section className="blog_post-buttons-container">
                <Link to={`/blogs/${blog.id}`}>
                  <button className="blog-post_visit">Visit Blog</button>
                </Link>
                {isAuthenticated && (
                  <button
                    onClick={async () =>
                      handleLike(blog.id, user.sub, blog.liked)
                    }
                    className={`blog-post_visit ${
                      blog.liked ? 'unlike-button' : 'like-button'
                    }`}
                    disabled={!isAuthenticated} 
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
