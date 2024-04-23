import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0xffffff);

const trainBody = new THREE.CylinderGeometry(0.7,0.7,2);
const trainBodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const trainBodyMesh = new THREE.Mesh(trainBody, trainBodyMaterial);
const eulerRotation = new THREE.Euler(Math.PI / 2, 0, 0);
trainBodyMesh.position.set(0, 0.075, 0);
trainBodyMesh.rotation.setFromVector3(eulerRotation);
scene.add(trainBodyMesh);

const trainBox = new THREE.BoxGeometry(1.5, 2, 1.5);
const trainBoxMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const trainBoxMesh = new THREE.Mesh(trainBox, trainBoxMaterial);
trainBoxMesh.position.set(0, 0.5, -1.5);
scene.add(trainBoxMesh);

const wheel1 = new THREE.TorusGeometry(0.2, 0.1);
const wheel1Material = new THREE.MeshPhongMaterial({ color: 0xAAAAAA });
const wheel1Mesh = new THREE.Mesh(wheel1, wheel1Material);
wheel1Mesh.position.set(0.75, -0.25, 0);
const wheelEulerRotation = new THREE.Euler(0,Math.PI / 2, 0);
wheel1Mesh.rotation.setFromVector3(wheelEulerRotation);
scene.add(wheel1Mesh);

const wheel2Mesh = new THREE.Mesh(wheel1, wheel1Material);
wheel2Mesh.position.set(0.75, -0.25, 0.7);
wheel2Mesh.rotation.setFromVector3(wheelEulerRotation);
scene.add(wheel2Mesh);

const wheel3Mesh = new THREE.Mesh(wheel1, wheel1Material);
wheel3Mesh.position.set(-0.75, -0.25, 0.7);
wheel3Mesh.rotation.setFromVector3(wheelEulerRotation);
scene.add(wheel3Mesh);

const wheel4Mesh = new THREE.Mesh(wheel1, wheel1Material);
wheel4Mesh.position.set(-0.75, -0.25, 0);
wheel4Mesh.rotation.setFromVector3(wheelEulerRotation);
scene.add(wheel4Mesh);

const bigWheel = new THREE.TorusGeometry(0.4, 0.2);
const bigWheelMesh = new THREE.Mesh(bigWheel, wheel1Material);
bigWheelMesh.position.set(1, 0, -1.5);
bigWheelMesh.rotation.setFromVector3(wheelEulerRotation);
scene.add(bigWheelMesh);

const big2Wheel = new THREE.TorusGeometry(0.4, 0.2);
const bigWheel2Mesh = new THREE.Mesh(big2Wheel, wheel1Material);
bigWheel2Mesh.position.set(-1, 0, -1.5);
bigWheel2Mesh.rotation.setFromVector3(wheelEulerRotation);
scene.add(bigWheel2Mesh);

const glassWindow = new THREE.SphereGeometry(0.4,32,32,0,2*Math.PI,0,Math.PI/2);
const glassWindowMaterial = new THREE.MeshPhongMaterial({ color: 0xa5e5ff });
const glass = new THREE.Mesh(glassWindow, glassWindowMaterial);
glass.position.set(0, 0.85, -0.75);
scene.add(glass);

const chimney = new THREE.CylinderGeometry(0.4,0.2,0.5);
const chimneyMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
const chimneyMesh = new THREE.Mesh(chimney, chimneyMaterial);
chimneyMesh.position.set(0, 1, 0.5);
scene.add(chimneyMesh);

const axesHelper = new THREE.AxesHelper(5); // Length of the axes
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(10, 10); // Size of the grid
scene.add(gridHelper);
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);
camera.position.set(5, 2, 3);
camera.lookAt(0, 0, 0);

/* Camera Control to check the opposite side of the train.
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};
let azimuth = 0;
let elevation = Math.PI / 2;
let distance = 5;

renderer.domElement.addEventListener('mousedown', function(e) {
    if (e.altKey && e.button === 0) {
        isDragging = true;
    }
});

renderer.domElement.addEventListener('mousemove', function(e) {
    if (isDragging) {
        var deltaX = e.offsetX - previousMousePosition.x;
        var deltaY = e.offsetY - previousMousePosition.y;
        azimuth -= deltaX * 0.01;
        elevation = Math.max(0.1,Math.min(Math.PI, elevation - deltaY * 0.01));
        updateCamera();
    }
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});

document.addEventListener('mouseup', function(e) {
    isDragging = false;
});

function updateCamera() {
    camera.position.x = distance * Math.sin(azimuth) * Math.sin(elevation);
    camera.position.y = distance * Math.cos(elevation);
    camera.position.z = distance * Math.cos(azimuth) * Math.sin(elevation);
    camera.lookAt(0, 0, 0)
}
*/

function animate() {
   requestAnimationFrame(animate);
   renderer.render(scene, camera);
}
animate();