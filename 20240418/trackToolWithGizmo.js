import * as THREE from 'three';

// Scene Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//Gizmo
// console.log("MyBox",box);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);
// Cube Setup
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Initial Camera Position
camera.position.z = 5;

// Variables for Camera Tracking
let isTracking = false;
let lastMouseX = 0;
let lastMouseY = 0;

renderer.domElement.addEventListener('mousedown', function(event) {
    if (event.altKey && event.button === 1) { // Alt key + Middle Mouse Button
        isTracking = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
});

document.addEventListener('mouseup', function(event) {
    isTracking = false;
});

renderer.domElement.addEventListener('mousemove', function(event) {
    if (isTracking) {
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;

        // Pass delta values to the updateCamera function
        updateCamera(deltaX, deltaY);
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
});

function updateCamera(deltaX, deltaY) {
    // Adjust camera position based on the deltas
    camera.position.x -= deltaX * 0.01;
    camera.position.y += deltaY * 0.01;

    // Ensure the camera's new position is used in the next render
    camera.updateProjectionMatrix();
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
