import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000124);

const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    100
);

camera.position.set(4, 4, 6);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AxesHelper(3));

const control = new OrbitControls(camera, renderer.domElement);

const origin = new THREE.Vector3(0, 0, 0);
const a = new THREE.Vector3(2, 1, 0);
const b = new THREE.Vector3(0, 2, 0);

const arrA = new THREE.ArrowHelper(
    a.clone().normalize(), origin, a.length(), 0xE8431C, 0.35, 0.2
);

const arrB = new THREE.ArrowHelper(
    b.clone().normalize(), origin, b.length(), 0x1E40FF, 0.35, 0.2
);

scene.add(arrA, arrB);

const sum = new THREE.Vector3().addVectors(a, b);

const arraySum = new THREE.ArrowHelper(
    sum.clone().normalize(), origin, sum.length(), 0x3ECF8C, 0.35, 0.2
);

scene.add(arraySum);

const gui = new GUI();

const params = {
    aX: a.x, aY: a.y, aZ: a.z,
    bX: b.x, bY: b.y, bZ: b.z,
    sum: '',
    dot: '',
    cross: '',
    crossLength: '',
    angle: ''
};

const aFolder = gui.addFolder('Vector A');

aFolder.add(params, 'aX', -5, 5, 0.1).name('X').onChange(value => { a.x = value; updateVectors(); });
aFolder.add(params, 'aY', -5, 5, 0.1).name('Y').onChange(value => { a.y = value; updateVectors(); });
aFolder.add(params, 'aZ', -5, 5, 0.1).name('Z').onChange(value => { a.z = value; updateVectors(); });

const bFolder = gui.addFolder('Vector B');

bFolder.add(params, 'bX', -5, 5, 0.1).name('X').onChange(value => { b.x = value; updateVectors(); });
bFolder.add(params, 'bY', -5, 5, 0.1).name('Y').onChange(value => { b.y = value; updateVectors(); });
bFolder.add(params, 'bZ', -5, 5, 0.1).name('Z').onChange(value => { b.z = value; updateVectors(); });

const resultFolder = gui.addFolder('Results');

resultFolder.add(params, 'sum').name('A + B');
resultFolder.add(params, 'dot').name('Dot Product');
resultFolder.add(params, 'cross').name('Cross Product');
resultFolder.add(params, 'crossLength').name('Cross Length');
resultFolder.add(params, 'angle').name('Angle (degrees)');

function updateVectors() {

    arrA.setDirection(a.clone().normalize());
    arrA.setLength(a.length());

    arrB.setDirection(b.clone().normalize());
    arrB.setLength(b.length());

    const sum = new THREE.Vector3().addVectors(a, b);

    if (sum.length() > 0) {
        arraySum.setDirection(sum.clone().normalize());
        arraySum.setLength(sum.length());
    } else {
        arraySum.setLength(0);
    }

    const dot = a.dot(b);
    const cross = new THREE.Vector3().crossVectors(a, b);
    const angle = a.angleTo(b) * (180 / Math.PI);

    params.sum = sum.toArray().map(n => n.toFixed(2)).join(', ');
    params.dot = dot.toFixed(2);
    params.cross = cross.toArray().map(n => n.toFixed(2)).join(', ');
    params.crossLength = cross.length().toFixed(2);
    params.angle = angle.toFixed(2) + '°';

    gui.controllersRecursive().forEach(controller => controller.updateDisplay());
}

function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);
}

updateVectors();
animate();