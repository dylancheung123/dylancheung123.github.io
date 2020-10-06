import React from 'react'
import { Link } from "react-router-dom"
import Photography from '../views/Photography';

export const withHeader = WrappedComponent => {
  return class extends React.Component{
    render(){
      return (
        <div>
          <div className="header">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/photography">Photography</Link>
          </div>
          <WrappedComponent/>
        </div>
      )
    }
  }
}