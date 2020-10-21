import React from 'react'
import Card from '../components/Card'
import wave1 from '../images/wave1.jpg'

export default class Photography extends React.Component {
  render(){
    const cardA = { 
      title: 'Title',
      description: 'Lorem ipsum dolor sit amet, hinc deleniti tractatos vis id, te inermis maiestatis vel. Et honestatis neglegentur intellegebat sea, justo omnium constituto vim an. Vel deleniti erroribus conclusionemque an, ornatus democritum instructior sea at, pro detracto laboramus assentior in. His ad purto erant democritum. Veri adhuc accusam eu mea, ut pro case ceteros incorrupte.',
      thumbnail: null
    }
    const cardB = { 
      title: 'Title',
      description: 'Lorem ipsum dolor sit amet, hinc deleniti tractatos vis id, te inermis maiestatis vel. Et honestatis neglegentur intellegebat sea, justo omnium constituto vim an. Vel deleniti erroribus conclusionemque an, ornatus democritum instructior sea at, pro detracto laboramus assentior in. His ad purto erant democritum. Veri adhuc accusam eu mea, ut pro case ceteros incorrupte.',
      thumbnail: wave1
    }
    const cards = [  cardB, cardA, cardA, cardA, cardA, cardA, cardA, cardA, cardA, cardA,]
    let i = 0
    return (
      <div className="photography-container">
        {
          cards.map( card => {
            i++
            return (
              <Card key={card.title+i} title={card.title} description={card.description} Thumbnail={card.thumbnail}/>
            )
          })
        }
      </div>
    )
  }
}