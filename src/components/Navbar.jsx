import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import userapi from '../api/userApi';
import './navbar.css';

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [showLinks, setShowLinks] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      if (isAuthenticated) {
        const fetchedUsername = user.username || user.name; // Call a regular function to fetch the username
        setUsername(fetchedUsername);
      }
    };

    fetchUsername();
  }, [isAuthenticated]); // Run effect when isAuthenticated changes

  const handleRegister = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      }
    });
    if (isAuthenticated) {
      userapi.createUser({ name: (user.username || user.name), email: user.email });
    }
  };

  return (
    <nav>
      <div className="navbar-header">
        <button className="navbar-toggler" onClick={() => setShowLinks(!showLinks)}>
          ☰
        </button>
      </div>
      <ul className={`navbar-links ${showLinks ? 'show' : ''}`}>
        <li>
          <NavLink to="/" onClick={() => setShowLinks(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/blogs" onClick={() => setShowLinks(false)}>
            Blog List
          </NavLink>
        </li>
        {isAuthenticated && (
          <>
            <li className='navbar-button_create-post'>
              <NavLink to="/create" onClick={() => setShowLinks(false)}>
                Create Blog
              </NavLink>
            </li>
            {username && ( // Display username only if it exists
              <li className='navbar-user-info'>
                <a href='/' className='link-button'>Welcome {username}</a>
              </li>
            )}
            <li>
              <a href='/' className='link-button' onClick={() => { logout({ returnTo: window.location.origin }); setShowLinks(false); }}>Logout</a>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <>
            <li className='navbar-button_login'>
              <a href='/' className='link-button' onClick={() => { loginWithRedirect(); setShowLinks(false); }}>Login</a>
            </li>
            <li className='navbar-button_register'>
              <a href='/' className='link-button' onClick={() => { handleRegister(); setShowLinks(false); }}>Register</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
