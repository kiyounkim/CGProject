import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xff0000, 2);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff,2);
spotLight.position.set(2.5, 2.5, 5);
spotLight.name = 'spot';
scene.add(spotLight);

ambientLight.visible = true;
spotLight.visible = false;

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 8);
camera.lookAt(0, 0, 0);

const sphereGeometry = new THREE.SphereGeometry(3);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.clickCount=0;
scene.add(sphere);

const coneGeometry = new THREE.ConeGeometry(2, 2);
const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(5, 0, 0);
cone.rotation.x = Math.PI;
cone.clickCount=0;
scene.add(cone);

const boxGeometry = new THREE.BoxGeometry(2,3,4);
const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 5, 0);
box.clickCount=0;
scene.add(box);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(sphere, true);
    const intersects2 = raycaster.intersectObject(cone, true);
    const intersects3 = raycaster.intersectObject(box, true);

    if (intersects.length > 0)
        sphere.clickCount++;
    if (intersects2.length > 0)
        cone.clickCount++;
    if (intersects3.length > 0)
        box.clickCount++;
}

window.addEventListener('keydown', function (event) {
        switch (event.key) {
        case 'a':
        ambientLight.visible = !ambientLight.visible;
        break;
        case 's':
        spotLight.visible = !spotLight.visible;
        break;
        }
    }
);

function colorChange(){
    if(sphere.clickCount%3==0)
        sphere.material.color.set(0xff0000);
    else if(sphere.clickCount%3==1)
        sphere.material.color.set(0x00ff00);
    else
        sphere.material.color.set(0x0000ff);
    if(cone.clickCount%3==0)
        cone.material.color.set(0x00ff00);
    else if(cone.clickCount%3==1)
        cone.material.color.set(0x0000ff);
    else
        cone.material.color.set(0xff0000);
    if(box.clickCount%3==0)
        box.material.color.set(0x0000ff);
    else if(box.clickCount%3==1)
        box.material.color.set(0xff0000);
    else
        box.material.color.set(0x00ff00);

}
function animate() {
    requestAnimationFrame(animate);
    colorChange();
    renderer.render(scene, camera);
}

animate();
