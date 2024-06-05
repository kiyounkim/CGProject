import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 2, 0);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 5, 5);
camera.lookAt(0, 0, 0);

function createTrain() {
    const trainGroup = new THREE.Group();
    const frontWheelGroup = new THREE.Group();
    const centerWheelGroup = new THREE.Group();
    const rearWheelGroup = new THREE.Group();
    trainGroup.add(frontWheelGroup);
    trainGroup.add(centerWheelGroup);
    trainGroup.add(rearWheelGroup);

    const rotationAngle = Math.PI / 2;

    const boxGeometry = new THREE.BoxGeometry(1, 1.5, 1);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x191970, shininess: 80 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    trainGroup.add(box);
    trainGroup.box = box;

    const coneGeometry = new THREE.ConeGeometry(0.3, 0.4, 32);
    const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff, shininess: 80 });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.set(0, 0.3, -1.5);
    cone.rotation.set(Math.PI, 0, 0);
    trainGroup.add(cone);

    const cylindergeometry = new THREE.CylinderGeometry(0.5, 0.5, 2);
    const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 80 });
    const cylinder = new THREE.Mesh(cylindergeometry, cylinderMaterial);
    cylinder.rotation.set(Math.PI / 2, 0, 0);
    cylinder.position.set(0, -0.25, -1);
    trainGroup.add(cylinder);
    trainGroup.cylinder = cylinder;

    const wheelGeometry = new THREE.TorusGeometry(0.15, 0.08, 7, 9, 5.5);
    const bigwheel = new THREE.TorusGeometry(0.3, 0.15, 7, 9, 5.5);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0xAAAAAA, reflectivity: 0, shininess: 30 });

    const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontWheelGroup.add(wheel1);
    frontWheelGroup.add(wheel2);
    frontWheelGroup.position.set(0, -0.5, -1.8);
    wheel1.position.set(-0.5, 0, 0);
    wheel2.position.set(0.5, 0, 0);
    wheel1.rotation.y += rotationAngle;
    wheel2.rotation.y += rotationAngle;

    const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    centerWheelGroup.add(wheel3);
    centerWheelGroup.add(wheel4);
    centerWheelGroup.position.set(0, -0.5, -1.3);
    wheel3.position.set(-0.5, 0, 0);
    wheel4.position.set(0.5, 0, 0);
    wheel3.rotation.y += rotationAngle;
    wheel4.rotation.y += rotationAngle;

    const wheel5 = new THREE.Mesh(bigwheel, wheelMaterial);
    const wheel6 = new THREE.Mesh(bigwheel, wheelMaterial);
    rearWheelGroup.add(wheel5);
    rearWheelGroup.add(wheel6);
    rearWheelGroup.position.set(0, -0.5, 0.1);
    wheel5.position.set(-0.5, 0, 0);
    wheel6.position.set(0.5, 0, 0);
    wheel5.rotation.y += rotationAngle;
    wheel6.rotation.y += rotationAngle;

    trainGroup.canMove = false;
    trainGroup.targetPosition = getRandomPoint();
    return trainGroup;
}

const trainGroup1 = createTrain();
const trainGroup2 = createTrain();
scene.add(trainGroup1);
scene.add(trainGroup2);

trainGroup1.position.set(-5, 0, 0);
trainGroup2.position.set(5, 0, 0);

let obb1 = new OBB().fromBox3(new THREE.Box3().setFromObject(trainGroup1));
let obb2 = new OBB().fromBox3(new THREE.Box3().setFromObject(trainGroup2));

const speed = 0.1;

function getRandomPoint() {
    return new THREE.Vector3(
        Math.random() * 20 - 10,
        0,
        Math.random() * 20 - 10
    );
}

function group_animation(trainGroup, obb) {
    if (trainGroup.position.distanceTo(trainGroup.targetPosition) < 0.25) {
        trainGroup.targetPosition = getRandomPoint();
    }

    const direction = new THREE.Vector3().subVectors(trainGroup.targetPosition, trainGroup.position).normalize();

    if (trainGroup.canMove) {
        trainGroup.position.addScaledVector(direction, speed);
    }

    trainGroup.children[0].rotation.x += 0.5;
    trainGroup.children[1].rotation.x += 0.5;
    trainGroup.children[2].rotation.x += 0.5;

    const lookAtTarget = new THREE.Vector3().addVectors(trainGroup.position, direction.multiplyScalar(-1));
    trainGroup.lookAt(lookAtTarget);

    obb.copy(new OBB().fromBox3(new THREE.Box3().setFromObject(trainGroup)));
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects1 = raycaster.intersectObjects(trainGroup1.children, true);
    const intersects2 = raycaster.intersectObjects(trainGroup2.children, true);

    if (intersects1.length > 0) {
        trainGroup1.canMove = !trainGroup1.canMove;
    }

    if (intersects2.length > 0) {
        trainGroup2.canMove = !trainGroup2.canMove;
    }
}

function checkCollision(obb1, obb2) {
    if (obb1.intersectsOBB(obb2)) {
        trainGroup1.cylinder.material.color.set(0xffff00);
        trainGroup2.cylinder.material.color.set(0xffff00);
        trainGroup1.box.material.color.set(0xffff00);
        trainGroup2.box.material.color.set(0xffff00);
    } else {
        trainGroup1.cylinder.material.color.set(0xff0000);
        trainGroup2.cylinder.material.color.set(0xff0000);
        trainGroup1.box.material.color.set(0x191970);
        trainGroup2.box.material.color.set(0x191970);
    }
}

function animate() {
    requestAnimationFrame(animate);
    group_animation(trainGroup1, obb1);
    group_animation(trainGroup2, obb2);
    checkCollision(obb1, obb2);
    renderer.render(scene, camera);
}

animate();
