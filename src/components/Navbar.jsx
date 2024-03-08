import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from '../api/userApi';
import './navbar.css';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNavLinkClick = () => {
    // Reload the page when a NavLink is clicked
    setLoggedIn(isLoggedIn());
    setShowDropdown(false);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav>
      <div className="navbar-header">
        <button className="navbar-toggler" onClick={handleDropdownToggle}>
          ☰
        </button>
      </div>
      <ul className={`navbar-links ${showDropdown ? 'show' : ''}`}>
        <li>
          <NavLink to="/" onClick={handleNavLinkClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/blogs" onClick={handleNavLinkClick}>
            Blog List
          </NavLink>
        </li>
        {loggedIn && (
          <>
            <li className='navbar-button_create-post'>
              <NavLink to="/create" onClick={handleNavLinkClick}>
                Create Blog
              </NavLink>
            </li>
            <li className='navbar-user-info'>
              <p>Welcome, User</p>
            </li>
          </>
        )}
        {!loggedIn && (
          <>
            <li className='navbar-button_login'>
              <NavLink to="/login" onClick={handleNavLinkClick}>
                Login
              </NavLink>
            </li>
            <li className='navbar-button_register'>
              <NavLink to="/register" onClick={handleNavLinkClick}>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
