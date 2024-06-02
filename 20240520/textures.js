import * as THREE from 'three';

const scene = new THREE.Scene();
let raycaster, mouse;
const cubes = [];

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('20240520/earth.jpg');
const cloudsTexture = textureLoader.load('20240520/clouds.jpg');
const moonTexture = textureLoader.load('20240520/moon.jpg');

earthTexture.magFilter = THREE.NearestFilter;
earthTexture.minFilter = THREE.NearestFilter;
cloudsTexture.magFilter = THREE.NearestFilter;
cloudsTexture.minFilter = THREE.NearestFilter;
moonTexture.magFilter = THREE.NearestFilter;
moonTexture.minFilter = THREE.NearestFilter;

const eD = 6378;
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(0, 0, 0);
scene.add(earth);

const cloudsGeometry = new THREE.SphereGeometry(1.01, 32, 32);
const cloudsMaterial = new THREE.MeshBasicMaterial({
    map: cloudsTexture,
    transparent: true,
    opacity: 0.5,
    depthWrite: true
});
const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
earth.add(clouds);

const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(384400 / eD, 0, 0); // Position the moon relative to the earth
earth.add(moon);

camera.position.set(earth.position.x, earth.position.y, earth.position.z + 5);

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

window.addEventListener('mousedown', onMouseDown, false);

function onMouseDown(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        console.log(intersects[0].object);

        // Create a new cube at the origin
        const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(0, 0, 0);
        scene.add(cube);

        // Calculate the direction from the cube to the intersection point
        const targetPosition = intersects[0].point;
        const cubeDirection = new THREE.Vector3();
        cubeDirection.subVectors(targetPosition, cube.position).normalize();

        // Store the cube, its direction, and creation time
        cubes.push({ mesh: cube, direction: cubeDirection, createdAt: Date.now() });
    }
}

// Variables for Camera Control
let azimuth = 0;
let elevation = Math.PI / 2;  // 90 degrees, looking horizontally
let distance = 5; // Distance from the earth

document.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'KeyW':
            elevation -= 0.1;
            elevation = Math.max(0.1, Math.min(Math.PI, elevation));
            break;
        case 'KeyS':
            elevation += 0.1;
            elevation = Math.max(0.1, Math.min(Math.PI, elevation));
            break;
        case 'KeyA':
            azimuth -= 0.1;
            break;
        case 'KeyD':
            azimuth += 0.1;
            break;
    }
    updateCamera();
});

function updateCamera() {
    camera.position.x = distance * Math.sin(azimuth) * Math.sin(elevation);
    camera.position.y = distance * Math.cos(elevation);
    camera.position.z = distance * Math.cos(azimuth) * Math.sin(elevation);
    camera.lookAt(earth.position);  // Make the camera always look at the earth
}

function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.001;
    clouds.rotation.y += 0.001;
    moon.rotation.y += 0.001;

    const now = Date.now();
    const lifetime = 10000; // Cube lifetime in milliseconds (10 seconds)

    // Move each cube towards its target direction and remove old cubes
    for (let i = cubes.length - 1; i >= 0; i--) {
        const { mesh, direction, createdAt } = cubes[i];
        const speed = 0.05;
        mesh.position.add(direction.clone().multiplyScalar(speed));

        // Remove the cube if it has exceeded its lifetime
        if (now - createdAt > lifetime) {
            scene.remove(mesh);
            cubes.splice(i, 1);
        }
    }

    renderer.render(scene, camera);
}

animate();
