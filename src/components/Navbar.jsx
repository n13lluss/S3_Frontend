import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/blogs">Blog List</NavLink>
        </li>
        <li className='navbar-button_create-post'>
          <NavLink to="/create">Create Blog</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
