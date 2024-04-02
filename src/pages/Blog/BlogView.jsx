import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import blogApi from '../../api/blogApi';
import Modal from '../../components/DeleteModal';
import PostCreationModal from '../../components/PostCreationModal'; // Import the PostCreationModal component
import PostList from '../Post/PostList';
import './blogview.css';

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPostCreationModal, setShowPostCreationModal] = useState(false); // State for showing post creation modal
  const navigate = useNavigate();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogApi.getBlogById(id);
        if (response.status === 404) {
          navigate('/blogs');
        } else {
          setBlog(response.data);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const token = await getAccessTokenSilently();
      await blogApi.deleteBlogById(id, token);
      navigate('/blogs');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      // Implement your logic to create a new post
      // Call the API endpoint or dispatch an action to create the post
      console.log('Creating post:', postData);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className='blog-view_page'>
      <Link className='blog-view_return-list' to='/blogs'>
        Back to List
      </Link>

      {blog ? (
        <div className='blog-view_container'>
          <h2 className='blog-view_name'>{blog.name}</h2>
          <p className='blog-view_description'>{blog.description}</p>
          <p className='blog-view_posted'>
            Started by {blog.user_Name} on {new Date(blog.startDate).toLocaleString()}
          </p>
          <p className='blog-view_likes'>Likes: {blog.likes}</p>

          {isAuthenticated && user.sub === blog.creator_Id   && (
            <>
              <section className='blog-view_buttons-container'>
                <Link to={`/edit/${blog.id}`}>
                  <button className='blog-view_button edit'>Edit</button>
                </Link>
                <button className='blog-view_button create-post' onClick={() => setShowPostCreationModal(true)}>
                  Create Post
                </button>
              </section>
            </>
          )}

          <div className='blog-view_posts-container'> {/* Container for posts */}
            <PostList posts={blog.posts} />
          </div>
          {isAuthenticated && user.sub === blog.creator_Id && (
            <button className='blog-view_button delete' onClick={() => setShowDeleteModal(true)}>
            Delete Blog
          </button>
          )}
          {/* Render the modals */}
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onDelete={handleDelete}
            postId={blog.id}
            blogName={blog.name}
          />
          <PostCreationModal
            isOpen={showPostCreationModal}
            onClose={() => setShowPostCreationModal(false)}
            onCreate={handleCreatePost}
            BlogId={blog.id}
            onPostCreated={() => window.location.reload()}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogView;
