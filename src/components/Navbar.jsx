import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/blogs">Blog List</Link>
        </li>
        <li className='navbar-button_create-post'>
          <Link to="/create">Create Blog</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
