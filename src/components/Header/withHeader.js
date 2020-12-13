import React from 'react'
import { Link } from "react-router-dom"
import './Header.css'

export const withHeader = WrappedComponent => {
  return class extends React.Component {
    render(){
      return (
        <div className='with-header'>
          <div className="link-container">
            <Link className="nav-link" to="/">Home</Link>
            <div className="split"> / </div>
            <Link className="nav-link" to="/projects">Projects</Link>
            <div className="split"> / </div>
            <Link className="nav-link" to="/photography">Photography</Link>
          </div>
          <WrappedComponent/>
        </div>
      )
    }
  }
}