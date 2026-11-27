import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#dbd4e0');

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.5,
    100
);

camera.position.set(0, 4, 10);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AmbientLight('#ffffff', 0.5));

const directionalLight = new THREE.DirectionalLight('#ffffff', 2.5);
directionalLight.position.set(4, 6, 5);
scene.add(directionalLight);

scene.add(new THREE.GridHelper(40, 40));

const colors = ['#256b63','#3a603a', '#c0c073','#9d7853', '#652a2a'];

for (let i = 0; i < colors.length; i++) {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        new THREE.MeshStandardMaterial({ color: colors[i] })
    );

    cube.position.set(-3 + i * 2, 0.75, -i * -3);
    scene.add(cube);
}

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 6),
    new THREE.MeshStandardMaterial({ color: '#576772', side: THREE.DoubleSide })
);

const planeB = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 6),
    new THREE.MeshStandardMaterial({ color: '#576772', side: THREE.DoubleSide })
);

plane.position.set(0, 3, -3);
planeB.position.set(0, -8, 0.001);

scene.add(plane, planeB);

const depthMaterial = new THREE.MeshDepthMaterial();
scene.overrideMaterial = depthMaterial;

const settings = {
    near: camera.near,
    far: camera.far,
    depth: true
};

function applyPlanes() {
    camera.near = settings.near;
    camera.far = settings.far;
    camera.updateProjectionMatrix();
}

const gui = new GUI();

gui.add(settings, 'depth').name('Depth Material').onChange((value) => {
    scene.overrideMaterial = value ? depthMaterial : null;
});

gui.add(settings, 'near', 0.001, 5, 0.001).onChange(applyPlanes);
gui.add(settings, 'far', 10, 1000, 1).onChange(applyPlanes);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();