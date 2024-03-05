import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './modal.css'

const Modal = ({ isOpen, onClose, onDelete, postId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await onDelete(postId);
      navigate('/blogs'); // Redirect to the blog list page after successful deletion
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Are you sure you want to delete this blog?</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;
