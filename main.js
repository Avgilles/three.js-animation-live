import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const gltfLoader  = new GLTFLoader();

const url = '/models/scene4.gltf'; // Chemin vers votre fichier GLTF

let clock = new THREE.Clock();


let scenemesh;

const loader = new GLTFLoader();
loader.load(url, function (gltf) {
    scenemesh = gltf.scene;
    scene.add(scenemesh);

    scenemesh.traverse((child) => {
        if (child.isMesh) {
            // Déplacement (translation)
            child.position.set(0, 0, 0);

            // Rotation en radians
            //child.rotation.x = Math.PI / 4;  // 45°
            //child.rotation.y = Math.PI / 6;  // 30°

            // Mise à l’échelle
            //child.scale.set(2, 2, 2);
        }
    });
});
  
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// console.log(gltfLoader);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

camera.position.z = 5;


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
    // cube.position.z = wheel_y;
    if (scenemesh) {
        scenemesh.traverse((child) => {
            if (child.isMesh) {
                // Rotation sur Y à chaque frame
                child.position.z = wheel_y; // Appliquer la position Z basée sur la molette de la souris
            }
        });
    }
  renderer.render( scene, camera );

}