import React from 'react'
import * as THREE from 'three'
import WAVES from 'vanta/dist/vanta.waves.min'


export default class Home extends React.Component {

  constructor(){
    super()
    this.vantaRef = React.createRef()
  }

  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy()
  }

  componentDidMount() {
    this.vantaEffect = WAVES({
      el: this.vantaRef.current,
      THREE: THREE, // use a custom THREE when initializing
      // color: 0x111111,
      waveHeight: 20,
      shininess: 50,
      waveSpeed: 1.0,
      zoom: 0.75
    })
  }

  render(){
    return(
      <div className="page" ref={this.vantaRef}>
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