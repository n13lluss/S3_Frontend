import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './EditModal.css';
import CountryApi from '../../../api/CountryApi';
import Select from 'react-select';

const EditModal = ({ isOpen, onClose, onEdit, blog }) => {
  const [editedBlogData, setEditedBlogData] = useState({ name: blog.name, description: blog.description, countries: blog.countries });
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await CountryApi.getAllCountries();
        setCountries(response);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    setSelectedCountries(blog.countries.map(country => ({
      value: country.id,
      label: `${country.name}`, // Show both name and value
    }))); // Set the preselected countries from the blog
  }, [blog.countries]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Prepare the data in the format expected by the API
      const updatedBlogData = {
        name: editedBlogData.name,
        description: editedBlogData.description,
        countries: selectedCountries.map(country => country.value), // Send only the country IDs to the API
      };
      onEdit(updatedBlogData);
      onClose();
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='edit-modal-overlay' onClick={onClose}>
      <div className='edit-modal-content' onClick={e => e.stopPropagation()}>
        <div className='edit-modal-header'>
          <h2>Edit Blog</h2>
        </div>
        <div className='edit-modal-body'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={editedBlogData.name}
              onChange={e => setEditedBlogData({ ...editedBlogData, name: e.target.value })}
            />
            <label htmlFor='description'>Description:</label>
            <textarea
              id='description'
              name='description'
              value={editedBlogData.description}
              onChange={e => setEditedBlogData({ ...editedBlogData, description: e.target.value })}
            ></textarea>
            <label htmlFor='countries'>Countries:</label>
            <Select
              id='countries'
              name='countries'
              options={countries.map(country => ({
                value: country.id,
                label: `${country.name}`, // Show both name and value
              }))}
              value={selectedCountries}
              onChange={handleCountryChange}
              isMulti
            />
            <div className='edit-modal-buttons'>
              <button type='submit' className='create-post'>
                Save Changes
              </button>
              <button type='button' className='cancel' onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default EditModal;
