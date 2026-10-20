import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(5, 6, 7);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const pointLight = new THREE.PointLight(0xffffff, 400, 0, 1.6);
const ambientLight = new THREE.AmbientLight(0xffffff, 2.3);
scene.add(pointLight, ambientLight);

// Sun
const geometry = new THREE.SphereGeometry(2, 32, 24);
const material = new THREE.MeshStandardMaterial({ color: 'gold' });
const sun = new THREE.Mesh(geometry, material);
scene.add(sun);

// Earth orbit
const earthOrbit = new THREE.Object3D();
sun.add(earthOrbit);


// Earth
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 24),
    new THREE.MeshStandardMaterial({ color: 'lightblue', roughness: 0.9 })
);
earth.position.x = 9;
earthOrbit.add(earth);

// Moon orbit
const moonOrbit = new THREE.Object3D();
earth.add(moonOrbit);

// Moon
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 32, 24),
    new THREE.MeshStandardMaterial({ color: 'gray', roughness: 0.8 })
);
moon.position.x = 1.8;
moonOrbit.add(moon);


//Mars Orbit 

const MarsOrbit = new THREE.Object3D();
sun.add(MarsOrbit);

// Mars
const Mars = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 24),
    new THREE.MeshStandardMaterial({ color: 'maroon', roughness: 0.9 })
);
Mars.position.x = 3.5;
MarsOrbit.add(Mars);

// Fobos orbit
const FobosOrbit = new THREE.Object3D();
Mars.add(FobosOrbit);


// Fobos
const Fobos = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 32, 24),
    new THREE.MeshStandardMaterial({ color: 'brown', roughness: 0.8 })
);
Fobos.position.x = 1.5;
FobosOrbit.add(Fobos);



// Controls
const control = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    control.update();

    earthOrbit.rotation.y += 0.01;  // Earth orbits the Sun
    earth.rotation.y += 0.04;       // Earth spins
    moonOrbit.rotation.y += 0.03;   // Moon orbits Earth
    moon.rotation.y += 0.01;        // Moon spins

    sun.rotation.y += 0.03 
    renderer.render(scene, camera);

    MarsOrbit.rotation.y += 0.008;
FobosOrbit.rotation.y += 0.07;
}

animate();