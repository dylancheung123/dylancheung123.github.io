import React from 'react'
import Card from '../components/Card'
import { githubLink } from '../helpers'

import gameControllerThumbnail from '../images/gameController.jpg'

export default class Projects extends React.Component {
  render(){
    const cardA = { 
      title: 'Game Controller',
      description: 'Based on the Azeron Game Controller, which allows pc users to have analog movement in FPS games instead of WASD movement.',
      thumbnail: gameControllerThumbnail,
      link: githubLink('gameController')
    }
    const cards = [ cardA ]
    let i = 0
    return (
      <div className="projects-container">
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
    )
  }   
}