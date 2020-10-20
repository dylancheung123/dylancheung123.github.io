import React from 'react'
import Card from '../components/Card'

export default class Photography extends React.Component {
  render(){
    const cardA = { 
      title: 'Title',
      description: 'Lorem ipsum dolor sit amet, hinc deleniti tractatos vis id, te inermis maiestatis vel. Et honestatis neglegentur intellegebat sea, justo omnium constituto vim an. Vel deleniti erroribus conclusionemque an, ornatus democritum instructior sea at, pro detracto laboramus assentior in. His ad purto erant democritum. Veri adhuc accusam eu mea, ut pro case ceteros incorrupte.',
      thumbnail: ''
    }
    const cards = [  cardA, cardA, cardA, cardA, cardA, cardA, ]
    return(
      <div className="photography-container">
        {
          cards.map( card => {
            return (
              <Card title={cardA.title} description={card.description} thumbnail={card.thumbnail}/>
            )
          })
        }
      </div>
    )
  }
}