import * as THREE from 'three';

let scene, camera, renderer;
let raycaster, mouse;
let selectedObject = null;
let movingObject = null;
let direction = 1;
let score = 0;
let gameOver = false;
let remainingTime = 60;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x0EB4F1);

const spotLight = new THREE.SpotLight(0xffffff, 100);
spotLight.position.set(0, 10, 0);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.1;
spotLight.name = 'spot';
scene.add(spotLight);

const topBoxGeo = new THREE.BoxGeometry(10.1, 1, 10.1);
const topBoxMat = new THREE.MeshToonMaterial({ color: 0x80EF6F });
const topBox = new THREE.Mesh(topBoxGeo, topBoxMat);
topBox.position.set(0, -1, 0);
scene.add(topBox);
const bottomBoxGeo = new THREE.BoxGeometry(10, 4, 10);
const bottomBoxMat = new THREE.MeshToonMaterial({ color: 0xA06411 });
const bottomBox = new THREE.Mesh(bottomBoxGeo, bottomBoxMat);
bottomBox.position.set(0, -3, 0);
scene.add(bottomBox);

const geometry = new THREE.CapsuleGeometry(0.8, 2, 3, 7);
const gridSize = 3;
const boxSpacing = 3;
let objects = [];
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        const material = new THREE.MeshToonMaterial({ color: 0xECB365 });
        material.flatShading = true;
        const box = new THREE.Mesh(geometry, material);
        box.position.set(
            (i - 1) * boxSpacing,
            -2.5,
            (j - 1) * boxSpacing
        );
        box.clickable = true;
        box.originalColor = 0xECB365;
        objects.push(box);
        scene.add(box);
    }
}

const cylGeometry = new THREE.CylinderGeometry(1.25, 1.25, 3, 8);
let tubes = [];
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        const cylMaterial = new THREE.MeshToonMaterial({ color: 0x4c4c4c });
        cylMaterial.flatShading = true;
        const cyl = new THREE.Mesh(cylGeometry, cylMaterial);
        cyl.position.set(
            (i - 1) * boxSpacing,
            -1.75,
            (j - 1) * boxSpacing
        );
        tubes.push(cyl);
        scene.add(cyl);
    }
}

camera.position.set(7, 10, 7);
camera.lookAt(0, 0, 0);

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

window.addEventListener('mousedown', onMouseClick, false);

let speed = 0.05;

function updateTimer() {
    if (remainingTime > 0) {
        remainingTime--;
        if (remainingTime % 10 === 0) {
            speed += 0.01;
        }
        document.getElementById('timer').innerText = `Time: ${remainingTime}s`;
        setTimeout(updateTimer, 1000);
    } else {
        gameOver = true;
    }
}

function animate() {
    document.getElementById('score').innerText = `Score: ${score}`;
    
    requestAnimationFrame(animate);
    if (!gameOver) {
        if (movingObject === null) {
            let randomIndex = Math.floor(Math.random() * objects.length);
            movingObject = objects[randomIndex];
        }
    }

    if (movingObject != null) {
        if (!movingObject.clickable) direction = -1;
        movingObject.position.y += speed * direction;
        if (movingObject.position.y >= -0.5) direction = -1;

        if (movingObject.position.y <= -2.5) {
            direction = 1;
            movingObject.material.color.set(movingObject.originalColor);
            movingObject.clickable = true;
            movingObject = null;
        }
    }

    objects.forEach(obj => {
        if (movingObject.position.y <= -2.5 && !obj.clickable) {
            obj.material.color.set(obj.originalColor);
            obj.clickable = true;
        }
    });

    renderer.render(scene, camera);
}

function onMouseClick(event) {
    event.preventDefault();

    if (!gameOver) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {
            selectedObject = intersects[0].object;

            if (selectedObject === movingObject && selectedObject.clickable) {
                selectedObject.clickable = false;
                selectedObject.material.color.set(0xff0000);
                score++;
                document.getElementById('score').innerText = `Score: ${score}`;
            }
        }
    }
}

const timerElement = document.createElement('div');
timerElement.id = 'timer';
timerElement.style.position = 'absolute';
timerElement.style.top = '10px';
timerElement.style.left = '50%';
timerElement.style.transform = 'translateX(-50%)';
timerElement.style.fontSize = '20px';
timerElement.style.fontWeight = 'bold';
timerElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
timerElement.style.padding = '10px';
timerElement.style.color = '#fff';
document.body.appendChild(timerElement);

const scoreElement = document.createElement('div');
scoreElement.id = 'score';
scoreElement.style.position = 'absolute';
scoreElement.style.top = '60px';
scoreElement.style.left = '50%';
scoreElement.style.transform = 'translateX(-50%)';
scoreElement.style.fontSize = '20px';
scoreElement.style.fontWeight = 'bold';
scoreElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
scoreElement.style.padding = '10px';
scoreElement.style.color = '#fff';
document.body.appendChild(scoreElement);

updateTimer();
animate();
