import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(8, 6, 12);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// Ground
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        color: "gray",
        side: THREE.DoubleSide
    })
);

ground.rotation.x = -Math.PI / 2;

const grid = new THREE.GridHelper(20, 20);
scene.add(ground, grid);

// Lights
const ambientLight = new THREE.AmbientLight("white", 0.5);
const dirLight = new THREE.DirectionalLight("white", 2);
scene.add(ambientLight, dirLight);

// Base
const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 32);
const baseMaterial = new THREE.MeshStandardMaterial({ color: "#8b6868" });

const base = new THREE.Mesh(baseGeometry, baseMaterial);
scene.add(base);

// Shoulder
const shoulder = new THREE.Group();
shoulder.position.y = 0.5;
base.add(shoulder);

const shoulderJoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    baseMaterial
);
shoulder.add(shoulderJoint);

// Upper arm
const armMaterial = new THREE.MeshStandardMaterial({ color: "maroon" });

const upperArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 3, 0.7),
    armMaterial
);
upperArm.position.y = 1.5;
shoulder.add(upperArm);

// Elbow
const elbow = new THREE.Group();
elbow.position.y = 3;
shoulder.add(elbow);

const elbowJoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 32, 32),
    baseMaterial
);
elbow.add(elbowJoint);

// Forearm
const forearm = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 3, 0.7),
    armMaterial
);
forearm.position.y = 1.5;
elbow.add(forearm);

// Wrist
const wrist = new THREE.Group();
wrist.position.y = 3;
elbow.add(wrist);

// Palm
const palm = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 1.5, 0.4),
    new THREE.MeshStandardMaterial({ color: "#5c2727" })
);
palm.position.y = 1;
wrist.add(palm);

// Fingers
const fingers = [];
const fingerGeometry = new THREE.BoxGeometry(0.25, 1, 0.25);
const fingerMaterial = new THREE.MeshStandardMaterial({ color: "#a95858" });

for (let i = 0; i < 5; i++) {
    const fingerJoint = new THREE.Group();
    fingerJoint.position.x = -0.7 + i * 0.35;
    fingerJoint.position.y = 0.75;
    palm.add(fingerJoint);

    const finger = new THREE.Mesh(fingerGeometry, fingerMaterial);
    finger.position.y = 0.5;
    fingerJoint.add(finger);

    fingers.push(fingerJoint);
}

// Wrist joint
const wristJoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 32, 32),
    baseMaterial
);
wrist.add(wristJoint);

// Initial rotations
shoulder.rotation.z = THREE.MathUtils.degToRad(-20);
elbow.rotation.z = THREE.MathUtils.degToRad(40);
wrist.rotation.z = THREE.MathUtils.degToRad(-20);

// Keyboard controls
const rotationStep = THREE.MathUtils.degToRad(5);

window.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase();

    if (key === 'q') {
        shoulder.rotation.z += rotationStep;
    }

    if (key === 'a') {
        shoulder.rotation.z -= rotationStep;
    }

    if (key === 'w') {
        elbow.rotation.z += rotationStep;
    }

    if (key === 's') {
        elbow.rotation.z -= rotationStep;
    }

    if (key === 'e') {
        wrist.rotation.z += rotationStep;
    }

    if (key === 'd') {
        wrist.rotation.z -= rotationStep;
    }
});

// Animation
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();