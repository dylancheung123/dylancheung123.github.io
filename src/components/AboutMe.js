import React from 'react'
import '../styles/styles.css'

export default class AboutMe extends React.Component {
    render(){
        return(
            <div>
                <div className="container">
                    <div className="header">
                        <div className="title">
                            Dylan Cheung
                        </div>
                    </div>
                    
                    <div className="center">
                        <div className="bio">
                            <p>
                                I've been a full-stack software engineer at 
                                <a href="https://himarley.com" target="_blank" className="himarley_link"> HiMarley </a> 
                                since the summer of 2019. I'm proficient in Javascript and utilizing AWS for creating 
                                scalable serverless applications. 
                            </p>
                            <p>
                                My current interests besides programming are photography, running, cycling, and design.
                                I'm always intrigued with trying out new activities in hopes to find more hobbies.
                            </p>
                        </div>
                    </div>
                    
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
                        <div className="resume">
                            <a href="./resume/DylanCheungResume.pdf" target="_blank"> resume </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}