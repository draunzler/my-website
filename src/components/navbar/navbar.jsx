import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

export const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
      </nav>
    </div>
  );
};