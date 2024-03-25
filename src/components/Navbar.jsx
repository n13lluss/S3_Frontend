// Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './navbar.css';

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <nav>
      <div className="navbar-header">
        <button className="navbar-toggler">
          ☰
        </button>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/blogs">
            Blog List
          </NavLink>
        </li>
        {isAuthenticated && (
          <>
            <li className='navbar-button_create-post'>
              <NavLink to="/create">
                Create Blog
              </NavLink>
            </li>
            <li className='navbar-user-info'>
              <a>Welcome, {user && user.nickname}</a>
            </li>
            <li>
              <a className='link-button' onClick={() => logout({ returnTo: window.location.origin })}>Logout</a>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <>
            <li className='navbar-button_login'>
              <a className='link-button' onClick={() => loginWithRedirect()}>Login</a>
            </li>
            <li className='navbar-button_register'>
              <NavLink to="/register">
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
