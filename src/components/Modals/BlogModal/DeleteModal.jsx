// Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './deletemodal.css';

const Modal = ({ isOpen, onClose, onDelete, postId, blogName }) => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const handleDelete = async () => {
    try {
      const token = await getAccessTokenSilently();
      await onDelete(postId, token);
      navigate('/blogs');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to delete the blog <br /> "{blogName}"?</p>
        <section className='modal-buttons'>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </section>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
