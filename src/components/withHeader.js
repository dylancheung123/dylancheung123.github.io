import React from 'react'
import { Link } from "react-router-dom"

export const withHeader = WrappedComponent => {
  return class extends React.Component{
    render(){
      return (
        <div className="app">
          <div className="header">
            <Link className="navLink" to="/">Home</Link>
            <div className="split"> / </div>
            <Link className="navLink" to="/projects">Projects</Link>
            <div className="split"> / </div>
            <Link className="navLink" to="/photography">Photography</Link>
          </div>
          <WrappedComponent/>
        </div>
      )
    }
  }
}