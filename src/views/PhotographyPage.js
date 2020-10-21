import React from 'react'
import _ from 'lodash'

export default class PhotographyPage extends React.Component {
  render(){
    const { info, clearSelected } = this.props
    const title = _.get(info, 'title')
    return (
      <div className="photography-page">
        <div onClick={clearSelected}>{"<--"}</div>
        {title}
      </div>
    )
  }
}