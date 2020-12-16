import React from 'react'
import Card from '../Card/Card'
import { githubLink } from '../../helpers'

import gameControllerThumbnail from '../../images/thumbnails/gameController.jpg'
import './Projects.css'
import * as THREE from 'three'
import BIRDS from 'vanta/dist/vanta.birds.min'

export default class Projects extends React.Component {

  constructor(){
    super()
    this.vantaRef = React.createRef()
  }

  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy()
  }

  componentDidMount() {
    this.vantaEffect = BIRDS({
      el: this.vantaRef.current,
      THREE: THREE, // use a custom THREE when initializing
    })
  }

  render(){
    const cardA = { 
      title: 'Game Controller',
      description: '3D printed controller to allow analog instead of WASD movement for pc games.',
      thumbnail: gameControllerThumbnail,
      link: githubLink('gameController')
    }
    const cards = [ cardA ]
    let i = 0
    return (
      <div ref={this.vantaRef} className='project-container'>
        <div className="project-gallery">
          {
            cards.map( card => {
              i++
              return (
                <Card 
                  key={card.title+i} 
                  title={card.title} 
                  description={card.description} 
                  thumbnail={card.thumbnail} 
                  setSelected={card.setSelected}
                  link={card.link}
                />
              )
            })
          }
        </div>
      </div>
    )
  }   
}