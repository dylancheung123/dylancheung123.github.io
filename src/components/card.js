import React from 'react'


export default class Card extends React.Component {
  render() {
    const { title, description, thumbnail, setSelected } = this.props
    if ( !title || !description ) return null
    const cardClick = setSelected ? setSelected : () => {}
    return (
      <div className='card'>
        <div className='card-title'>{title}</div>
        { (thumbnail && thumbnail !== '') ? <img className={'card-thumbnail'} src={thumbnail} onClick={ () => cardClick({ title, description }) }/> : null }
        <div className='card-description'>{description}</div>
      </div>
    )
  }
}