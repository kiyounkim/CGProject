import * as THREE from 'three';
//setting scene
const scene = new THREE.Scene();
//Geometry information
const triangleGeometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
-0.9, 0.85, 0,
-0.9, -0.9, 0,
0.85, -0.9, 0
]);

triangleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

//Material information
const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0X800080, side: THREE.DoubleSide }); 
const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);

//Scene Add
scene.add(triangleMesh);

const triangleGeometry2 = new THREE.BufferGeometry();
const vertices2 = new Float32Array([
-0.9, 0.85, 0,
0.85, 0.85, 0,
0.85, -0.9, 0
]);
triangleGeometry2.setAttribute('position', new THREE.BufferAttribute(vertices2, 3));
//Material information
const triangleMaterial2 = new THREE.MeshBasicMaterial({ color: 0X800080, side: THREE.DoubleSide }); //if THREE.FrontSide, only front side is generated.
const triangleMesh2 = new THREE.Mesh(triangleGeometry2, triangleMaterial2);
scene.add(triangleMesh2);


// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
  //objects only between innerplane and farplane are visible
  //THREE.PerspectiveCamera(fov, aspect ratio, near plane, far plane)
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();