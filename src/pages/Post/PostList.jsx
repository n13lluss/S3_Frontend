import React from 'react';
import './postlist.css';

const PostList = ({ posts }) => {
  return (
    <div className="blog-view_posts">
      {posts.map(post => (
        <div key={post.id} className="blog-view_post">
          <h3>{post.name}</h3>
          <p>{post.description}</p>
          <p>Posted on: {new Date(post.posted).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
