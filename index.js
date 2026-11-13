import * as THREE from "three";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

// CAMERA
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 600;

const scene = new THREE.Scene();

// DESK
const depth = 1;
const width = window.innerWidth;
const height = window.innerHeight;
const desk = new THREE.BoxGeometry(width, height, depth);

const textureLoader = new THREE.TextureLoader();
let deskImg = textureLoader.load("assets/desk.jpg");
deskImg.colorSpace = THREE.SRGBColorSpace;

const texture = new THREE.MeshBasicMaterial({
    map: deskImg});
const desktop = new THREE.Mesh(desk, texture);
scene.add(desktop);

// LIGHT
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(hemiLight);

function animate(t = 0) {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();