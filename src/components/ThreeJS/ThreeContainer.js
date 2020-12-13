// import React, { Component } from 'react'
// import threeEntryPoint from './threeEntryPoint'
// import '../styles/BackgroundAnimation.css'

// export default class ThreeContainer extends Component {

//     componentDidMount() {
//       threeEntryPoint(this.threeRootElement)
//     }

//     render () {
//         return (
//           <div ref={element => this.threeRootElement = element} />
//         );
//     }
//   }


import React, { Component } from "react"
import * as THREE from "three"

export default class ThreeContainer extends Component {
  componentDidMount() {
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )
    var renderer = new THREE.WebGLRenderer()
    // renderer.setSize( window.innerWidth, window.innerHeight )
    this.mount.appendChild( renderer.domElement )
    var geometry = new THREE.BoxGeometry( 1, 1, 1 )
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    var cube = new THREE.Mesh( geometry, material )
    scene.add( cube )
    camera.position.z = 5
  
    var geometry = new THREE.SphereGeometry( 200, 15, 10 )
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true, wireframeLinewidth: 3 } )
    var mesh = new THREE.Mesh( geometry, material )
    scene.add( mesh )

    var animate = function () {
      requestAnimationFrame( animate )
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      if (mesh) {
        mesh.rotation.x = Date.now() * 0.0002
        mesh.rotation.y = Date.now() * 0.001
      }
      renderer.render( scene, camera )
    }
    animate()
  }

  render() {
    return (
      <div className='three-container' ref={ref => (this.mount = ref)} />
    )
  }
}