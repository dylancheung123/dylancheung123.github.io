import React from 'react'
import { Link } from "react-router-dom"
import './Header.css'

export const Header = () => (
  <div className='header'>
    <div className="link-container">
      <Link className="nav-link" to="/">Home</Link>
      <div className="split"> / </div>
      <Link className="nav-link" to="/projects">Projects</Link>
      <div className="split"> / </div>
      <Link className="nav-link" to="/photography">Photography</Link>
    </div>
  </div>
)