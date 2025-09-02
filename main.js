import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.setFocalLength(10);


const fresnelShader = new THREE.ShaderMaterial({
    uniforms: {
        cameraPosition: { value: new THREE.Vector3() },
        color: { value: new THREE.Color(0xffffff) },
        power: { value: 1.5 }
    },
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewDir = normalize(-mvPosition.xyz);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform vec3 color;
        uniform float power;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
            float fresnel = pow(1.0 - dot(vNormal, vViewDir), power);
            gl_FragColor = vec4(color * fresnel, fresnel); // alpha = fresnel
        }
    `,
    transparent: true
});



const material1 = new THREE.MeshStandardMaterial( { color: 0xffffff } );
const material2 = new THREE.MeshStandardMaterial( { color: 0xffffff } );


material1.emissive.set(1,1,1); 
material1.emissiveIntensity = 0.1;
material1.transparent= true;
material1.opacity = 0.5;


material2.emissive.set(1,1,1); 
material2.emissiveIntensity = 0.1;

// const light = new THREE.PointLight(0xffffff, 1);
// light.position.set(0, 3, 0);
// scene.add(light);

camera.position.z = 5;

const geometry = new THREE.BoxGeometry( 2.5, 2.5, 2.5 );
const cube = new THREE.Mesh( geometry, fresnelShader );

const geo2 = new THREE.SphereGeometry( 1, 16, 16);
const sphere = new THREE.Mesh( geo2, material2 );
scene.add( sphere );
scene.add( cube );


const BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );

const params = {
            threshold: 0,
            strength: 1,
            radius: 0.005,
            exposure: .1
        };

const controls = new OrbitControls( camera, renderer.domElement );

const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;


const outputPass = new OutputPass();


const bloomComposer = new EffectComposer( renderer );
bloomComposer.renderToScreen = true;
bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPass );
bloomComposer.addPass( outputPass );


const finalComposer = new EffectComposer( renderer );



// controls.update();


function animate() {

    requestAnimationFrame( animate );

    controls.update();

    bloomComposer.render();
    // renderer.render( scene, camera );
    finalComposer.render();

}

