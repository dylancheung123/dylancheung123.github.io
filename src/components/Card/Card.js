import React from 'react'
import './Card.css'

export default class Card extends React.Component {
  render() {
    const { title, description, thumbnail, link } = this.props
    if ( !title || !description ) return null

    return (
      <a href={link} className={'card'} >
        {thumbnail && <img 
          className={'card-thumbnail'} 
          src={thumbnail} 
        />}
        <div className='card-title'>{title}</div>
        <div className='card-description'>{description}</div>
      </a>
    )
  }
}