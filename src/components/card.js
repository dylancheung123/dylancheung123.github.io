import React from 'react'


export default class Card extends React.Component {
  render() {
    const { title, description, Thumbnail, onClick } = this.props
    if ( !title || !description ) return null
    return (
      <div className='card'>
        <div className='card-title'>{title}</div>
        { (Thumbnail && Thumbnail !== '') ? <Thumbnail/> : null }
        <div className='card-description'>{description}</div>
      </div>
    )
  }
}