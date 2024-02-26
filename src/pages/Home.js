import React, { useState, useEffect } from 'react';
import Blog from '../components/Blog/Blog';

const API_URL = 'https://localhost:7177/api/Blog/getAll';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(blogs.map(blog => blog.name))
  return (
    <div className="home">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : blogs.length > 0 ? (
        blogs.map(blog => <Blog key={blog.id} blogname={blog.name} />)
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
}
