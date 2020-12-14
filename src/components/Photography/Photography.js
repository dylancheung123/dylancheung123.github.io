import React from 'react'
import Card from '../Card/Card'
import cloud from '../../images/cloud.jpg'
import banhMiRestaurant from '../../images/banhMiRestaurant.jpg'
import floating from '../../images/floating.jpg'
import goats from '../../images/goats.jpg'
import skiLift from '../../images/skiLift.jpg'
import theVessel from '../../images/theVessel.jpg'
import vietnamAlley from '../../images/vietnamAlley.jpg'
import woodenStructure from '../../images/woodenStructure.jpg'
import craterLake from '../../images/craterLake.jpg'
import redwoods from '../../images/redwoods.jpg'
import water from '../../images/water.jpg'
import { vscoLink } from '../../helpers'
import './Photography.css'

import AwesomeSlider from 'react-awesome-slider'
// import Captioned from 'react-awesome-slider/src/hoc/captioned-images';
// /home/dylan/Projects/dylancheung123.github.io/node_modules/react-awesome-slider/src/hoc/captioned-images/index.js

// import withCaption from 'react-awesome-slider/dist/captioned';
// import 'react-awesome-slider/dist/captioned.css';
import 'react-awesome-slider/dist/styles.css'

// const CaptionedSlider = withCaption(AwesomeSlider);

// const cardA = { 
//   title: 'Title',
//   description: 'Lorem ipsum dolor sit amet, hinc deleniti tractatos vis id, te inermis maiestatis vel. Et honestatis neglegentur intellegebat sea, justo omnium constituto vim an. Vel deleniti erroribus conclusionemque an, ornatus democritum instructior sea at, pro detracto laboramus assentior in. His ad purto erant democritum. Veri adhuc accusam eu mea, ut pro case ceteros incorrupte.',
//   thumbnail: null
// }
// const cardB = { 
//   title: 'The Wave',
//   description: 'Coconino County, AZ | Only a 4.5% chance of winning a permit to visit for a day.',
//   thumbnail: wave,
//   link: vscoLink('5f55818b92fdab666a3f7c63')
// }
// const cardC = { 
//   title: 'Wooden Structure',
//   description: 'Albany, NY | A photo of depth, texture, and shades of brown. ',
//   thumbnail: woodenStructure,
//   link: vscoLink('5f11fc61afeac415d2107ad9')
// }
// const cardD = { 
//   title: 'Forest Alley',
//   description: 'Saigon, Vietnam | The neighbors of our Airbnb loved plants.',
//   thumbnail: forestAlley,
//   link: vscoLink('5f0e4825e4a5a222c2457299')
// }
// const cardE = { 
//   title: 'An Open Window',
//   description: 'Saigon, Vietnam | Grabbed bánh mì early in the morning. Took a photo directly across from our table. ',
//   thumbnail: openWindow,
//   link: vscoLink('5f0cfdf59310f54d798dba97')
// }
// const cardF = { 
//   title: 'Stars',
//   description: 'A collection of my attempts at astrophotography.',
//   thumbnail: stars1,
//   link: vscoLink('5f55830592fdab666a3f7c67')
// }
// const cardG = { 
//   title: 'Crater Lake',
//   description: 'Klamath County, OR | Almost endless mountains at sunrise.',
//   thumbnail: craterLake,
//   link: vscoLink('5f11fc4cafeac415d2107ad6')
// }
// const cardH = { 
//   title: 'Clouds',
//   description: 'A collection of clouds, one of the most photogenic parts of nature.',
//   thumbnail: clouds1,
//   link: vscoLink('5f55828392fdab666a3f7c66')
// }

// const cards = [  cardB, cardC, cardD, cardE, cardF, cardG, cardH, ]


export default class Photography extends React.Component { 
  render(){
    let i = 0
    return (
      <div className='photography-container'>
        {/* <div className='image-gallery'>  */}
          <AwesomeSlider
            animation="foldOutAnimation"
            className='awesome-slider'
            // startupScreen={StartupScreen}
            media={[
              { source: theVessel },
              { source: water },
              { source: cloud },
              { source: banhMiRestaurant },
              { source: redwoods },
              { source: woodenStructure },
              { source: goats },
              { source: craterLake },
              { source: vietnamAlley },
            ]}
          />
        {/* </div> */}
        {/* <div className="photography-grid">
          { cards.map( card => ( 
            <Card 
              key={card.title} 
              title={card.title} 
              description={card.description} 
              thumbnail={card.thumbnail} 
              link={card.link}
            />
          ))}
        </div> */}
      </div>
    )
  }
}