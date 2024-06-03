import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000000);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Create the first cylinder geometry and material
const geometry = new THREE.CylinderGeometry(1.35, 0.9, 3, 8);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

// Create the second cylinder geometry and material
const geometry2 = new THREE.CylinderGeometry(1.25, 0.9, 2.5, 8);
const material2 = new THREE.MeshBasicMaterial({ color: 0xECB365 });
const cylinder2 = new THREE.Mesh(geometry2, material2);
geometry2.translate(0, -0.2, 0);
// Position the second cylinder
scene.add(cylinder2);

// Position the camera
camera.position.z = 5;

// Define the animate function
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Call the animate function for the first time to kick things off
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
