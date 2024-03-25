import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import userapi from '../api/userApi'; // import the userapi module
import './navbar.css';

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleRegister = () => {
    loginWithRedirect({authorizationParams: {
      screen_hint: "signup",
    }})
    if (isAuthenticated) {
      userapi.register(user);
    }
  };

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
              <a href='/' className='link-button'>Welcome {user.name}</a>
            </li>
            
            <li>
              <a href='/' className='link-button' onClick={() => logout({ returnTo: window.location.origin })}>Logout</a>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <>
            <li className='navbar-button_login'>
              <a href='/' className='link-button' onClick={() => loginWithRedirect()}>Login</a>
            </li>
            <li className='navbar-button_register'>
              <a href='/' className='link-button' onClick={(handleRegister)}>Register</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
