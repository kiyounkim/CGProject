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

const trainBox = new THREE.BoxGeometry(1.5, 2, 1.5);
const trainBoxMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const trainBoxMesh = new THREE.Mesh(trainBox, trainBoxMaterial);
trainBoxMesh.position.set(0, 0.5, -1.5);

const wheel1 = new THREE.TorusGeometry(0.2, 0.1, 32, 8);
const wheel1Material = new THREE.MeshPhongMaterial({ color: 0xAAAAAA });
const wheel1Mesh = new THREE.Mesh(wheel1, wheel1Material);
wheel1Mesh.position.set(0.75, -0.25, 0);
const wheelEulerRotation = new THREE.Euler(0,Math.PI / 2, 0);
wheel1Mesh.rotation.setFromVector3(wheelEulerRotation);

const wheel2Mesh = new THREE.Mesh(wheel1, wheel1Material);
wheel2Mesh.position.set(0.75, -0.25, 0.7);
wheel2Mesh.rotation.setFromVector3(wheelEulerRotation);

const wheel3Mesh = new THREE.Mesh(wheel1, wheel1Material);
wheel3Mesh.position.set(-0.75, -0.25, 0.7);
wheel3Mesh.rotation.setFromVector3(wheelEulerRotation);

const wheel4Mesh = new THREE.Mesh(wheel1, wheel1Material);
wheel4Mesh.position.set(-0.75, -0.25, 0);
wheel4Mesh.rotation.setFromVector3(wheelEulerRotation);

const bigWheel = new THREE.TorusGeometry(0.4, 0.2,32,8);
const bigWheelMesh = new THREE.Mesh(bigWheel, wheel1Material);
bigWheelMesh.position.set(1, 0, -1.5);
bigWheelMesh.rotation.setFromVector3(wheelEulerRotation);

const big2Wheel = new THREE.TorusGeometry(0.4, 0.2,32,8);
const bigWheel2Mesh = new THREE.Mesh(big2Wheel, wheel1Material);
bigWheel2Mesh.position.set(-1, 0, -1.5);
bigWheel2Mesh.rotation.setFromVector3(wheelEulerRotation);

const glassWindow = new THREE.SphereGeometry(0.4,32,32,0,2*Math.PI,0,Math.PI/2);
const glassWindowMaterial = new THREE.MeshPhongMaterial({ color: 0xa5e5ff });
const glass = new THREE.Mesh(glassWindow, glassWindowMaterial);
glass.position.set(0, 0.85, -0.75);

const chimney = new THREE.CylinderGeometry(0.4,0.2,0.5);
const chimneyMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
const chimneyMesh = new THREE.Mesh(chimney, chimneyMaterial);
chimneyMesh.position.set(0, 1, 0.5);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);
camera.position.set(0 , 10, 10);
camera.lookAt(0, 5, 0);

const group = new THREE.Group();
group.add(trainBodyMesh);
group.add(trainBoxMesh);
group.add(wheel1Mesh);
group.add(wheel2Mesh);
group.add(wheel3Mesh);
group.add(wheel4Mesh);
group.add(bigWheelMesh);
group.add(bigWheel2Mesh);
group.add(glass);
group.add(chimneyMesh);
scene.add(group);

const points = [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(10, 0, 0)
];

let currentSegment = 0;
const speed = 0.1;
let cube_direction = 1; 
function group_animation() {
    wheel1Mesh.rotation.z += 0.1;
    wheel2Mesh.rotation.z += 0.1;
    wheel3Mesh.rotation.z += 0.1;
    wheel4Mesh.rotation.z += 0.1;
    bigWheelMesh.rotation.z += 0.1;
    bigWheel2Mesh.rotation.z += 0.1;

    if (group.position.distanceTo(points[currentSegment]) < 0.25) {
        currentSegment = (currentSegment + 1) % points.length;
        cube_direction *= (-1);
    }
    const targetPosition = points[currentSegment];
    const direction = new THREE.Vector3().subVectors(targetPosition, group.position).normalize();
    
    group.position.addScaledVector(direction, speed);

    group.lookAt(targetPosition);

    if(currentSegment%3 == 0){
        camera.position.set(group.position.x , group.position.y + 10, group.position.z + 10);
        camera.lookAt(group.position);
    }
    else if(currentSegment % 3 == 1) {
        camera.position.set(points[1].x, points[1].y, points[1].z);
        camera.lookAt(points[0]);
    }
    else {
        camera.position.set(points[1].x, points[1].y, points[1].z);
        camera.lookAt(points[2]);
    }    
}

function animate() {
    requestAnimationFrame(animate);
    group_animation();
    renderer.render(scene, camera);
}

animate();