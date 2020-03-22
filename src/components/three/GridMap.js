import * as THREE from 'three'

export default function GridMap(scene){

  /* Fog provides depth to the landscape*/
  // scene.fog = new THREE.Fog(0x000, 0, 45)

  // var light	= new THREE.AmbientLight( 0x202020 )
  // scene.add( light )
  // var light	= new THREE.DirectionalLight('white', 5)
  // light.position.set(0.5, 0.0, 2)
  // scene.add( light )
  // var light	= new THREE.DirectionalLight('white', 0.75*2)
  // light.position.set(-0.5, -0.5, -2)
  // scene.add( light )

  var heightMap	= THREEx.Terrain.allocateHeightMap(256,256)
  THREEx.Terrain.simplexHeightMap(heightMap)	
  var geometry	= THREEx.Terrain.heightMapToPlaneGeometry(heightMap)
  // THREEx.Terrain.heightMapToVertexColor(heightMap, geometry)

  // /* Wireframe built-in color is white, no need to change that */
  var material	= new THREE.MeshBasicMaterial({
      wireframe: true
  })
  // var mesh	= new THREE.Mesh( geometry, material )

  const geometry2 = new THREE.IcosahedronBufferGeometry(radius, 2)
  const material2 = new THREE.MeshStandardMaterial({ flatShading: true })

  const radius = 2
  var mesh = new THREE.Mesh(geometry2, material);

	mesh.position.set(0, 0, -20);

  scene.add( mesh )
  // mesh.lookAt(new THREE.Vector3(0,1,0))
  // /* Play around with the scaling */
  // mesh.scale.y	= 3.5
  // mesh.scale.x	= 3
  // mesh.scale.z	= 0.20
  // mesh.scale.multiplyScalar(10)

  /* Play around with the camera */
  // var onRenderFcts= []
  // onRenderFcts.push(function(delta, now){
  //     mesh.rotation.z += 0.2 * delta
  // })
  // onRenderFcts.push(function(){
  //     renderer.render( scene, camera )	
  // })
  // var lastTimeMsec= null
  // requestAnimationFrame(function animate(nowMsec){
  //     requestAnimationFrame( animate )
  //     lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
  //     var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
  //     lastTimeMsec	= nowMsec
  //     onRenderFcts.forEach(function(onRenderFct){
  //         onRenderFct(deltaMsec/1000, nowMsec/1000)
  //     })
  // })

  // var lastTimeMsec= null
  this.update = function(time) {
    // lastTimeMsec	= lastTimeMsec || time-1000/60
    // var deltaMsec	= Math.min(200, time - lastTimeMsec)
    // lastTimeMsec	= time

    // const delta = deltaMsec/1000
    // mesh.rotation.z += 0.2 * delta
    const scale = Math.sin(time)+2;

		mesh.scale.set(scale, scale, scale);
  }
}