import React from 'react'
import ReactDOM from 'react-dom'

import AboutMe from './components/AboutMe'
import BackgroundAnimation from './components/BackgroundAnimation'

const template = (
    <div>   
        <AboutMe/>
        <BackgroundAnimation/>
    </div>
)

ReactDOM.render(template, document.getElementById('root'))