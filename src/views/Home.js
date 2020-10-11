import React from 'react'

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