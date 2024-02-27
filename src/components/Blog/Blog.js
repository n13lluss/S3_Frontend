import React from 'react';
import './blog.css'

const Blog = ({ blogname }) => {
  return (
    <div className='blog-card'>
      <img className='blog-card-image' src="" alt="blog" />
      <h1 className='blog-card-header'>{blogname}</h1>
      <p className='blog-card-text'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolor
        ipsum tenetur sequi iusto corrupti. Eveniet assumenda provident tempora
        error magni labore eum voluptate quisquam corporis! Beatae doloribus
        excepturi tenetur.
      </p>
      <ul>
        <li>
            <a href="/">
                <button className='blog-card-visit'>Visit blog</button>
            </a>
        </li>
        <li>
            <a href="/">
                <button className='blog-card-like'>like</button>
            </a>
        </li>
      </ul>
    </div>
  );
};

export default Blog;
