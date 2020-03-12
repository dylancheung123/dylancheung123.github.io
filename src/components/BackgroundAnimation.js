import React, { Component } from 'react'
import * as THREE from 'three'
import '../styles/BackgroundAnimation.css'
import ReactDOM from 'react-dom'


export default class BackgroundAnimation extends Component {

    componentDidMount(){
        // var camera, scene, renderer;
        // var geometry, material, mesh;
        
    
        // camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        // camera.position.z = 5;
    
        // scene = new THREE.Scene();
    
        // geometry = new THREE.BoxGeometry( 1,1,1 );
        // material = new THREE.MeshNormalMaterial();
    
        // mesh = new THREE.Mesh( geometry, material );
        // scene.add( mesh );
    
        // renderer = new THREE.WebGLRenderer( { antialias: true } );
        // renderer.setSize( window.innerWidth, window.innerHeight-4 );
        // this.mount.appendChild( renderer.domElement );
        
        // function animate() {
        
        //     requestAnimationFrame( animate );
        
        //     mesh.rotation.x += 0.01;
        //     mesh.rotation.y += 0.02;
        
        //     renderer.render( scene, camera );
        
        // }
        // animate();        
    }

    render() {
        return <div className='animation' ref={ref => (this.mount = ref)} />;
    }
}
 
