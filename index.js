import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { CSS3DRenderer, CSS3DObject } from 'jsm/renderers/CSS3DRenderer.js';

// RENDERING FOR CSS3D OBJECTS
const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = "absolute";
cssRenderer.domElement.style.top = "0px";
document.body.appendChild(cssRenderer.domElement);

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

// CAMERA
const fov = 75;
const aspect = w / h;
const near = 0.01;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 1.5;

const scene = new THREE.Scene();

// CUBE
const geo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
const mat = new THREE.MeshStandardMaterial({color: 0xccff});

const CUBE = new THREE.Mesh(geo, mat);
scene.add(CUBE);

// PAGE RENDER
const face1 = new CSS3DObject(document.getElementById("p1"));
const face2 = new CSS3DObject(document.getElementById("p2"));
const face3 = new CSS3DObject(document.getElementById("p3"));
const face4 = new CSS3DObject(document.getElementById("p4"));
const face5 = new CSS3DObject(document.getElementById("p5"));
const face6 = new CSS3DObject(document.getElementById("p6"));
face1.scale.set(1/1000, 1/1000, 1/1000);
face2.scale.set(1/1000, 1/1000, 1/1000);
face3.scale.set(1/1000, 1/1000, 1/1000);
face4.scale.set(1/1000, 1/1000, 1/1000);
face5.scale.set(1/1000, 1/1000, 1/1000);
face6.scale.set(1/1000, 1/1000, 1/1000);
face1.position.set(0  , 0, 1/2);
face2.position.set(0.5  , 0, 0);
face2.rotation.y = Math.PI/2;
face3.position.set(0  , 0 , -1/2);
face3.rotation.y = Math.PI;
face4.position.set(-0.5  , 0, 0);
face4.rotation.y = -(Math.PI/2);
face5.position.set(0  , 0.5, 0);
face5.rotation.x = -(Math.PI/2);
face6.position.set(0  , -0.5, 0);
face6.rotation.x = Math.PI/2;
CUBE.add(face1);
CUBE.add(face2);
CUBE.add(face3);
CUBE.add(face4);
CUBE.add(face5);
CUBE.add(face6);

// CONTROLS
const controls = new OrbitControls(camera, cssRenderer.domElement);

// LIGHT
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
scene.add(hemiLight);

// Controls
let initialClick = false;
onmousedown = (e) => {
    initialClick = true;
}

function animate(t = 0) {
    cssRenderer.render(scene, camera);
    if(!initialClick){
        controls.update();
        requestAnimationFrame(animate, initialClick);
        CUBE.rotation.y = -t * 0.0005;
        renderer.render(scene, camera);
    }else{
        controls.update();
        requestAnimationFrame(animate, initialClick);
        renderer.render(scene, camera);
    }
}
animate();

async function loadPage(divId, filePath) {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(divId).innerHTML = html;
}

loadPage("p1", "pages/side1.html");
loadPage("p2", "pages/side2.html");
loadPage("p3", "pages/side3.html");
loadPage("p4", "pages/side4.html");
loadPage("p5", "pages/side5.html");
loadPage("p6", "pages/side6.html");