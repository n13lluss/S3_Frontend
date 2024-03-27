import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './postcreationmodal.css';
import postApi from '../api/postApi';
import { useAuth0 } from '@auth0/auth0-react';

const PostCreationModal = ({ isOpen, onClose, BlogId, onPostCreated }) => {
  const [postName, setPostName] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  const handleCreatePost = async () => {
    try {
      if (!postName) {
        return;
      }

      const formData = {
        blogId: BlogId,
        name: postName,
        description: postDescription,
      };

      console.log('Creating post:', formData);
      const token = await getAccessTokenSilently();
      await postApi.createPost(formData, token);

      setPostName('');
      setPostDescription('');
      onClose();

      // Call the onPostCreated callback if provided
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='post-creation-modal-overlay' onClick={onClose}>
      <div className='post-creation-modal-content' onClick={(e) => e.stopPropagation()}>
        <input
          type='text'
          placeholder='Post Name'
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
        />
        <textarea
          placeholder='Post Description'
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
        />
        <section className='modal-buttons'>
          <button className='create-post' onClick={handleCreatePost}>Create Post</button>
          <button className='cancel' onClick={onClose}>Cancel</button>
        </section>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default PostCreationModal;
