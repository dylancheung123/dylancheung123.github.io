import React from 'react'
import Card from '../components/Card'
// import PhotographyPage from './PhotographyPage'
import wave from '../images/wave1.jpg'
import woodenStructure from '../images/woodenStructure.jpg'
import forestAlley from '../images/forestAlley.jpg'
import openWindow from '../images/openWindow.jpg'
import stars1 from '../images/stars1.jpg'
import craterLake from '../images/craterLake.jpg'
import clouds1 from '../images/clouds1.jpg'

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

  vscoLink(photoId){
    return `https://vsco.co/dylan-cheung/media/${photoId}`
  }

  render(){
    // if (!this.state.selected){ // Table of cards
      const cardA = { 
        title: 'Title',
        description: 'Lorem ipsum dolor sit amet, hinc deleniti tractatos vis id, te inermis maiestatis vel. Et honestatis neglegentur intellegebat sea, justo omnium constituto vim an. Vel deleniti erroribus conclusionemque an, ornatus democritum instructior sea at, pro detracto laboramus assentior in. His ad purto erant democritum. Veri adhuc accusam eu mea, ut pro case ceteros incorrupte.',
        thumbnail: null
      }
      const cardB = { 
        title: 'The Wave',
        description: 'Coconino County, AZ | Only a 4.5% chance of winning a permit to visit for a day.',
        thumbnail: wave,
        link: this.vscoLink('5f55818b92fdab666a3f7c63')
      }
      const cardC = { 
        title: 'Wooden Structure',
        description: 'Albany, NY | A photo of depth, texture, and shades of brown. ',
        thumbnail: woodenStructure,
        link: this.vscoLink('5f11fc61afeac415d2107ad9')
      }
      const cardD = { 
        title: 'Forest Alley',
        description: 'Saigon, Vietnam | The neighbors of our Airbnb loved plants.',
        thumbnail: forestAlley,
        link: this.vscoLink('5f0e4825e4a5a222c2457299')
      }
      const cardE = { 
        title: 'An Open Window',
        description: 'Saigon, Vietnam | Grabbed bánh mì early in the morning. Took a photo directly across from our table. ',
        thumbnail: openWindow,
        link: this.vscoLink('5f0cfdf59310f54d798dba97')
      }
      const cardF = { 
        title: 'Stars',
        description: 'A collection of my attempts at astrophotography.',
        thumbnail: stars1,
        link: this.vscoLink('5f55830592fdab666a3f7c67')
      }
      const cardG = { 
        title: 'Crater Lake',
        description: 'Klamath County, OR | Almost endless mountains at sunrise.',
        thumbnail: craterLake,
        link: this.vscoLink('5f11fc4cafeac415d2107ad6')
      }
      const cardH = { 
        title: 'Clouds',
        description: 'A collection of clouds, one of the most photogenic parts of nature.',
        thumbnail: clouds1,
        link: this.vscoLink('5f55828392fdab666a3f7c66')
      }
      const cards = [  cardB, cardC, cardD, cardE, cardF, cardG, cardH, ]
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
                  link={card.link}
                />
              )
            })
          }
        </div>
      )
    // } else { // A single page
    //   return (
    //     <div className="photography-container">
    //       <PhotographyPage 
    //         info={this.state.selected} 
    //         clearSelected={this.clearSelected}
    //       />
    //     </div>
    //   )
    // }

  }
}