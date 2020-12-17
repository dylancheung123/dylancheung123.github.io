import React from 'react'
import './Footer.css'

export const withFooter = WrappedComponent => {
  return class extends React.Component {
    render(){
      return (
        <div className='with-footer'>
          <WrappedComponent/>
          <div className="footer">
            <div className="icons">
              <a href="https://github.com/dylancheung123/"> 
                <i className="fab fa-github-square fa-2x"></i>
              </a>
              <a href="https://www.linkedin.com/in/dylancheung123/"> 
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
              <a href="https://www.instagram.com/dylancheung_/" className="icon">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      )
    }
  }
}