import React from 'react'
import './Card.css'

export default class Card extends React.Component {
  render() {
    const { title, description, thumbnail, setSelected, link } = this.props
    if ( !title || !description ) return null
    // const cardClick = setSelected ? setSelected : () => {}
    const withThumbnail = thumbnail => {
      return (thumbnail && thumbnail !== '') ?
       <img 
        className={'card-thumbnail'} 
        src={thumbnail} 
        // onClick={ () => cardClick({ title, description, imagePath }) }
      /> : 
      <div className={'card-thumbnail'}/>
    }

    const withLink = (link, child) => {
      return (link && link !== '') ? 
        <a href={link} className={'card-link'} >
          {child}
        </a> :
        child
    }

    return (
      <div className='card'>
        <div className='card-title'>{title}</div>
          { withLink(link, withThumbnail(thumbnail))}
        <div className='card-description'>{description}</div>
      </div>
    )
  }
}