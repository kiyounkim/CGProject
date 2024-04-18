import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const boxGeometry = new THREE.BoxGeometry(1, 0.5, 1); // Width, height, depth
const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff }); // Green color
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0,0.5,0)
scene.add(box);

const box2Geometry = new THREE.BoxGeometry(2, 0.5, 2.5); // Width, height, depth
const box2Material = new THREE.MeshPhongMaterial({ color: 0xffff00 }); // Green color
const box2 = new THREE.Mesh(box2Geometry, box2Material);
scene.add(box2);

const wheelGeometry = new THREE.SphereGeometry(0.25, 32, 32);
const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0xAAAAAA });
const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
wheel1.position.set(1,0, 1.25);
scene.add(wheel1);
const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
wheel2.position.set(-1,0, 1.25);
scene.add(wheel2);
const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
wheel3.position.set(1,0, -1.25);
scene.add(wheel3);
const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
wheel4.position.set(-1,0, -1.25);


const axesHelper = new THREE.AxesHelper(5); // Length of the axes
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(10, 10); // Size of the grid
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

function animate() {
   requestAnimationFrame(animate);
   renderer.render(scene, camera);
}
animate();