import React from 'react'
import './Home.css'

export default class Home extends React.Component {
  render(){
    return(
      <div className="page">
        <div className="container">
          <div className="bio-header">
            <div className="title">
                Hi, I'm Dylan
            </div>
          </div>
          <div className="center">
            <div className="bio">
              <p>
                I'm full-stack web developer at <a href="https://himarley.com" target="_blank" className="himarley_link"> HiMarley </a> 
                where we create simple and intuitive tools to improve the workflow of insurance operators.
              </p>
              <p>
                I enjoy anything technology related and I strive to keep learning
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}