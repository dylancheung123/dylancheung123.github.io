import React from 'react'

export default class Card extends React.Component {
  render() {
    const { title, description, thumbnail, onClick } = this.props
    if ( !title || !description || !thumbnail ) return
    return (
      <div className='card'>
        <div className='title'>{title}</div>
      </div>
    )
  }
}