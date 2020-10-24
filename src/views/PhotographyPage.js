import React from 'react'
import _ from 'lodash'
import ImageGallery from 'react-image-gallery'
import axios from 'axios'

export default class PhotographyPage extends React.Component {

  constructor(){
    super()
    this.state = {
      done: false
    }
  }

  async getAlbum(id) {
    const response = await fetch(`https://photos.app.goo.gl/Zspipn54VddNw66r8`, {mode: 'no-cors'}).catch(e => {console.error(e)})
    return response  
  }

  async componentDidMount(){
    const res = await this.getAlbum('Zspipn54VddNw66r8')
    console.log(res)
    this.setState({ done: true })
  }

  render(){
    const { info, clearSelected } = this.props
    const title = _.get(info, 'title')
    const imagePath = _.get(info, 'imagePath')
    const images = []

    if (this.state.done){
      return (
        <div className="photography-page">
          <div onClick={clearSelected}>{"<--"}</div>
          {title}
          {/* <ImageGallery items={images} /> */}
        </div>
      )
    } else {
      return ( <div className="photography-page"/> )
    }
  } 

}