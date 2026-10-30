import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#eedcdc');

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(5,8,4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5,10,5);
scene.add(directionalLight);

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

const loader = new GLTFLoader();

loader.load(
    '/car.glb',
    (gltf) => {
        scene.add(gltf.scene);
        console.log('Car loaded successfully!');
    },
    undefined,
    (error) => {
        console.error('Error loading car:', error);
    }
);

function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}); 

