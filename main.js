import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';



const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.setFocalLength(10);


const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );

material.emissive.set(1,1,1); 
material.emissiveIntensity = 10;


const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 3, 0);
scene.add(light);

camera.position.z = 5;

const geometry = new THREE.BoxGeometry( 1, 5, 1 );
let cubes = [];

for(let i=0; i<4; i++){
    const cube = new THREE.Mesh( geometry, material );

    cube.rotation.set(0, 0, Math.PI*2*.25*(i+.5)); 

    // cube.rotation.z += Math.PI*.5;
    // let pos = i-2;
    // cube.position.set(pos*2, pos*2, 0); 


    scene.add( cube );
    cubes.push(cube);
}

// cubes[0].position.x += 2;
// cubes[0].position.y += 2;

cubes[1].position.x -= 3;
cubes[1].position.x -= 3;


cubes[2].position.x += 3;
cubes[2].position.y += 3;



const controls = new OrbitControls( camera, renderer.domElement );
controls.update();


function animate() {

    requestAnimationFrame( animate );

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render( scene, camera );

}