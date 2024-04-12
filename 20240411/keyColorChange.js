import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;


function changeColor(colorHex) {
   cube.material.color.set(colorHex);
}
// Keyboard event listener
document.addEventListener('keydown', (event) => {
  switch (event.key) {
      case '1':
          changeColor(0xff0000); // Red
          break;
      case '2':
          changeColor(0x00ff00); // Green
          break;
      case '3':
          changeColor(0x0000ff); // Blue
          break;
      case '4':
          changeColor(0xffff00); // Yellow
          break;
      case '5':
          changeColor(0xff00ff); // Magenta
          break;
      default:
          break;
  }
});
// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();