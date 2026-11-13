import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

// CAMERA
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 1.5;

const scene = new THREE.Scene();

// CUBE
const geo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
const mat = new THREE.MeshStandardMaterial({
    color: 0xccff
});
const CUBE = new THREE.Mesh(geo, mat);
scene.add(CUBE);

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// LIGHT
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
scene.add(hemiLight);

// Controls
let initialClick = false;
onmousedown = (e) => {
    initialClick = true;
}

function animate(t = 0) {
    if(!initialClick){
        controls.update();
        requestAnimationFrame(animate, initialClick);
        CUBE.rotation.y = t * 0.0005;
        renderer.render(scene, camera);
    }else{
        controls.update();
        requestAnimationFrame(animate, initialClick);
        renderer.render(scene, camera);
    }
}
animate();

