import React, { Component } from 'react'
import threeEntryPoint from './threeEntryPoint'
import '../styles/ThreeContainer.css'

export default class ThreeContainer extends Component {
    componentDidMount() {
      threeEntryPoint(this.threeRootElement);
    }
    render () {
        return (
          <div className={'animation'} ref={element => this.threeRootElement = element} />
        );
    }
  }