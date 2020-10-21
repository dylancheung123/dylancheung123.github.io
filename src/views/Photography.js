import React from 'react'
import Card from '../components/Card'
import PhotographyPage from './PhotographyPage'
import wave1 from '../images/wave1.jpg'

export default class Photography extends React.Component {
  
  constructor(){
    super()
    this.state = {
      selected: null
    }
    this.setSelected = this.setSelected.bind(this)
    this.clearSelected = this.clearSelected.bind(this)
  }

  setSelected(value){
    this.setState({selected: value}, () => console.log(this.state))
  }

  clearSelected(){
    this.setSelected(null)
  }

  render(){
    if (!this.state.selected){ // Table of cards
      const cardA = { 
        title: 'Title',
        description: 'Lorem ipsum dolor sit amet, hinc deleniti tractatos vis id, te inermis maiestatis vel. Et honestatis neglegentur intellegebat sea, justo omnium constituto vim an. Vel deleniti erroribus conclusionemque an, ornatus democritum instructior sea at, pro detracto laboramus assentior in. His ad purto erant democritum. Veri adhuc accusam eu mea, ut pro case ceteros incorrupte.',
        thumbnail: null
      }
      const cardB = { 
        title: 'The Wave',
        description: 'Got the chance to visit The Wave in Kanab, Utah. Only a 4.5% chance of winning a permit to visit for a day.',
        thumbnail: wave1,
        setSelected: this.setSelected
      }
      const cards = [  cardB, cardA, cardA, cardA, cardA, cardA, cardA, cardA, cardA, cardA,]
      let i = 0
      return (
        <div className="photography-container">
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
                />
              )
            })
          }
        </div>
      )
    } else { // A single page
      return (
        <div className="photography-container">
          <PhotographyPage info={this.state.selected} clearSelected={this.clearSelected}/>
        </div>
      )
    }

  }
}