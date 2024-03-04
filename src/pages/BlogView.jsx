import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import blogApi from '../api/blogApi';
import Modal from '../components/Modal';

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
  console.log(blog)
  return (
    <div>
      <Link to="/blogs">Back to List</Link> {/* Add this line for the "Back to List" button */}
      
      {blog ? (
        <div>
          <h2>{blog.name}</h2>
          <p>{blog.description}</p>
          <p>Posted by {blog.user_Name} on {new Date(blog.startDate).toLocaleString()}</p>
          <p>Likes: {blog.likes}</p>
          
          {/* Edit and Delete buttons */}
          <Link to={`/edit/${blog.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => setShowDeleteModal(true)}>Delete</button>
          
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
