import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );

material.emissive.set(1,1,1); 
material.emissiveIntensity = 10;
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
  


// console.log(gltfLoader);
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

camera.position.z = 5;


const geometry = new THREE.SphereGeometry( .05, 8, 8 );
const sphere = new THREE.Mesh( geometry, material );
sphere.position.set(.2, 0, 5); 
// sphere.position = camera.position.xyz; 
scene.add( sphere );

let wheel_y = 0;
let pshere = (sphere.position.x, sphere.position.y, sphere.position.z);

let points = [];
points.push( new THREE.Vector3(sphere.position.x, sphere.position.y, sphere.position.z ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );

let geo = new THREE.BufferGeometry().setFromPoints( points );

let line = new THREE.Line( geo, material );


document.addEventListener("wheel", (event) => {
    wheel_y += event.deltaY * 0.001;
    console.log("event.deltaY :", event.deltaY );
    // console.log("wheel_y:", wheel_y); 
    // console.log("camera.position:", camera.position);


    camera.position.z = 5 + wheel_y; // Ajuster la position de la caméra en fonction de la molette de la souris
    camera.lookAt(0, 0, 0); // Assurez-vous que la caméra regarde toujours le centre de la scène
    // camera.rotateZ(wheel_y*.25); // Rotation de la caméra autour de l'axe Z
    sphere.position.z = 5+wheel_y * 1.7;
    sphere.position.x = Math.sin(wheel_y*1.5) * 0.25;
    sphere.position.y = Math.sin(wheel_y*3) * .1;
    light.position.set(sphere.position.x, sphere.position.y, sphere.position.z);
    /// lenght(points[-1] - sphere.position) > 0.01


    if (event.deltaY < 0 ) {
        points.push(new THREE.Vector3(sphere.position.x, sphere.position.y, sphere.position.z)); 
    }
    else if (event.deltaY > 0 ) {
        // points.splice(0, 1);
        points.pop(); 

    }
    // line.computeLineDistances();
    scene.remove(line);
    line.frustumCulled = false;
    geo = new THREE.BufferGeometry().setFromPoints( points );
    line = new THREE.Line( geo, material );
    scene.add( line );


    console.log("points:", points);

  });





function animate() {
    renderer.setClearColor(0x000000, 1); // Couleur de fond noire
    renderer.render( scene, camera );

}
