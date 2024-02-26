import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className='blog_navbar'>
        <h1 className='blog_navbar-item'>JobaRouter</h1>
        <section className='blog_navbar-navigation'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="about">About</NavLink>
        </section>
    </nav>
  )
}

export default Navbar