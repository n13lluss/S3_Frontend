import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import blogApi from '../../api/blogApi';
import Modal from '../../components/Modal';
import PostList from '../Post/PostList';
import './blogview.css'

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogApi.getBlogById(id);
        setBlog(response);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await blogApi.deleteBlogById(id);
      // Redirect to the blog list page or handle as needed
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  
  return (
    <div className='blog-view_page'>
      <Link className='blog-view_return-list' to="/blogs">Back to List</Link>

      {blog ? (
        <div className='blog-view_container'>
          <h2 className='blog-view_name'>{blog.name}</h2>
          <p className='blog-view_description'>{blog.description}</p> 
          <p className='blog-view_posted'>Posted by {blog.user_Name} on {new Date(blog.startDate).toLocaleString()}</p>
          <p className='blog-view_likes'>Likes: {blog.likes}</p>

          <section className='blog-view_buttons-container'>
            <Link to={`/edit/${blog.id}`}>
              <button className='blog-view_button edit'>Edit</button>
            </Link>
            <button className='blog-view_button delete' onClick={() => setShowDeleteModal(true)}>Delete</button>
          </section>

          <PostList posts={blog.posts} />

          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onDelete={handleDelete}
            postId={blog.id}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogView;
