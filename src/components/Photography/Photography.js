import React from 'react'
import cloud from '../../images/cloud.jpg'
import goats from '../../images/goats.jpg'
import theVessel from '../../images/theVessel.jpg'
import woodenStructure from '../../images/woodenStructure.jpg'
import craterLake from '../../images/craterLake.jpg'
import panels from '../../images/panels.jpg'
import './Photography.css'

import AwesomeSlider from 'react-awesome-slider'
import withAutoPlay from 'react-awesome-slider/dist/autoplay'
import 'react-awesome-slider/dist/styles.css'

const AutoplaySlider = withAutoPlay(AwesomeSlider)

export default class Photography extends React.Component { 
  render(){
    let i = 0
    return (
        <AutoplaySlider
          play
          cancelOnInteraction
          interval={6000}
          animation="foldOutAnimation"
          className='awesome-slider'
          bullets={false}
          // startupScreen={StartupScreen}
          media={[
            { source: craterLake },
            { source: panels },
            { source: goats },
            { source: woodenStructure },
            { source: cloud },
            { source: theVessel },
          ]}
        />
    )
  }
}