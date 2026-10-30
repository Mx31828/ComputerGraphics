import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#eedcdc');

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(5, 8, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);

const ambientlight = new THREE.AmbientLight(0xffffff, 0.35);
const dir = new THREE.DirectionalLight(0xffffff, 2.5);

dir.position.set(5, 8, 4);
scene.add(dir, ambientlight);

const positions = new Float32Array([
    0,1.5,0,
    0,-1.5,0,
    1,0,0,
    0,0,1,
    -1,0,0,
    0,0,-1
]);

const index = [
    0,3,2,
    0,4,3,
    0,5,4,
    0,2,5,
    1,2,3,
    1,3,4,
    1,4,5,
    1,5,2
];

const geometry = new THREE.BufferGeometry();

geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
);

geometry.setIndex(index);
geometry.computeVertexNormals();

const material = new THREE.MeshStandardMaterial({
    color: '#babfff',
    roughness: 0.4,
    side: THREE.FrontSide
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const nonIndexed = geometry.toNonIndexed();
nonIndexed.computeVertexNormals();

console.log(
    'kulm',
    geometry.attributes.position.count,
    'faqe',
    index.length / 3,
    'e indeksuar'
);

console.log(
    'kulm',
    nonIndexed.attributes.position.count,
    'faqe',
    index.length / 3,
    'Jo e indeksuar'
);

window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'f') {
        mesh.geometry = mesh.geometry === geometry ? nonIndexed : geometry;
    }
});

function animate() {
    requestAnimationFrame(animate);
    control.update();
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
}

animate();