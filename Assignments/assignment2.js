import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var material = new THREE.MeshBasicMaterial({});

var geometry = new THREE.BoxGeometry();
var cube = new THREE.Mesh(geometry, material);

var geometry2 = new THREE.SphereGeometry();
var sphere = new THREE.Mesh(geometry2, material);

var geometry3 = new THREE.CylinderGeometry();;
var cylinder = new THREE.Mesh(geometry3, material);

var geometry4 = new THREE.TorusGeometry();;
var torus = new THREE.Mesh(geometry4, material);

const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
let colorIndex = 0;
material.color.set(colors[colorIndex]);

camera.position.z = 5;

function changeColor() {
    colorIndex = (colorIndex + 1) % colors.length;
    cube.material.color.set(colors[colorIndex]);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

document.addEventListener('keydown', function(event) {
    switch (event.key) {
    case '1':
        scene.add(cube);
    break;
    case '2':
        scene.add(sphere);
    break;
    case '3':
        scene.add(cylinder);
    break;
    case '4':
        scene.add(torus);
    break;
    case 'w':
        cube.position.y += 0.1;
    break;
    case 's':
        cube.position.y -= 0.1;
    break;
    case 'a':
        cube.position.x -= 0.1;
    break;
    case 'd':
        cube.position.x += 0.1;
    break;
    case 't':
        sphere.position.y += 0.1;
    break;
    case 'g':
        sphere.position.y -= 0.1;
    break;
    case 'f':
        sphere.position.x -= 0.1;
    break;
    case 'h':
        sphere.position.x += 0.1;
    break;
    case 'i':
        cylinder.position.y += 0.1;
    break;
    case 'k':
        cylinder.position.y -= 0.1;
    break;
    case 'j':
        cylinder.position.x -= 0.1;
    break;
    case 'l':
        cylinder.position.x += 0.1;
    break;
    case 'o':
        torus.position.y += 0.1;
    break;
    }
});
document.addEventListener('click', () => {
    changeColor();
});
