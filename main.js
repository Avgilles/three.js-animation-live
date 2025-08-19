import * as THREE from 'three';
// import Math

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
let clock = new THREE.Clock();


let wheel_y = 0;

document.addEventListener("wheel", (event) => {
    wheel_y += event.deltaY * 0.01; // Ajuster la sensibilité
    // console.log("Delta Y:", event.deltaY); // valeur positive ou négative
    console.log("wheel_y:", wheel_y); // valeur positive ou négative
  });

function animate() {

//    cube.rotation.x += 0.01;
//    cube.rotation.y += 0.01;
//    cube.position.x = Math.sin(clock.getElapsedTime());
    cube.position.z = wheel_y;
  renderer.render( scene, camera );

}