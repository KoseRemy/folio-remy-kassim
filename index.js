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
const far = 10000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2500;

const scene = new THREE.Scene();

// CUBE
const geo = new THREE.BoxGeometry(1000, 1000, 1000);
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
face1.position.set(0  , 0, 500);
face2.position.set(500  , 0, 0);
face2.rotation.y = Math.PI/2;
face3.position.set(0  , 0 , -500);
face3.rotation.y = Math.PI;
face4.position.set(-500  , 0, 0);
face4.rotation.y = -(Math.PI/2);
face5.position.set(0  , 500, 0);
face5.rotation.x = -(Math.PI/2);
face6.position.set(0  , -500, 0);
face6.rotation.x = Math.PI/2;
CUBE.add(face1);
CUBE.add(face2);
CUBE.add(face3);
CUBE.add(face4);
CUBE.add(face5);
CUBE.add(face6);

// 1. Cube Spins : All Faces Invisible
allFaces(0)

// CONTROLS
const controls = new OrbitControls(camera, cssRenderer.domElement);

// LIGHT
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
scene.add(hemiLight);

// Controls
let initialClick = false;
let initZoom = false;
onmousedown = (e) => {
    initialClick = true;
}

// HANDLES INITIAL CLICK
let lastFace = null;
let currFace = null;
function animate(t = 0) {
    requestAnimationFrame(animate);

    // STATE 1: before the user clicks, spin the cube
    if (!initialClick) {
        CUBE.rotation.y = -t * 0.0005;
    }

    // STATE 2: first frame after the click, snap to face 1 (runs once)
    if (initialClick && !initZoom) {
        currFace = 1;
        CUBE.rotation.y = 0;
        camera.position.z = 1152;
        initZoom = true;
        controls.enabled = false;
        face1.visible = true;
    }

    controls.update();
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera);
}
animate();


// ================ KEYBOARD CONTROLS =================================================================

let rotateFace1 = 0;
let rotateFace2 = 0;
let rotateFace3 = 0;
let rotateFace4 = 0;
let rotateFace5 = 0;
let rotateFace6 = 0;

window.addEventListener("keydown", (e) => {
    if(initialClick === false){return}

    let up    = (e.key === "w" || e.key === "ArrowUp");
    let left  = (e.key === "a" || e.key === "ArrowLeft");
    let down  = (e.key === "s" || e.key === "ArrowDown");
    let right = (e.key === "d" || e.key === "ArrowRight");

    if(currFace === 1){
        lastFace = currFace;
        if (up)    {goTo(5);}
        if (left)  {goTo(4)}
        if (down)  {goTo(6)}
        if (right) {goTo(2)}
    }
    else if(currFace === 2){
        lastFace = currFace;
        if (up)    {goTo(5)}
        if (left)  {goTo(1)}
        if (down)  {goTo(6)}
        if (right) {goTo(3)}
    }
    else if(currFace === 3){
        lastFace = currFace;
        if (up)    {goTo(5)}
        if (left)  {goTo(2)}
        if (down)  {goTo(6)}
        if (right) {goTo(4)}
    }
    else if(currFace === 4){
        lastFace = currFace;
        if (up)    {goTo(5)}
        if (left)  {goTo(3)}
        if (down)  {goTo(6)}
        if (right) {goTo(1)}
    }
    // FACE 5 (top)
    else if(currFace === 5){
        if (down)  {goTo(lastFace)}
    }
    // FACE 6 (bottom)
    else if(currFace === 6){
        if (up)    {goTo(1)}
    }
    if (e.key === "Escape") {controls.enabled = true; allFaces(1)}

});

// Loads each html page into corresponding div
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

function goTo(nextFace){
    face(currFace, 0);
    rotateFace(nextFace);
    face(nextFace, 1);
}

function rotateFace(face){
    currFace = face;
    if(face === 1){ CUBE.rotation.set(0, 0, 0); }
    else if(face === 2){ CUBE.rotation.set(0, -(Math.PI/2), 0); }
    else if(face === 3){ CUBE.rotation.set(0, Math.PI, 0); }
    else if(face === 4){ CUBE.rotation.set(0, Math.PI/2, 0); }
    else if(face === 5){ CUBE.rotation.set(Math.PI/2, 0, 0); }
    else if(face === 6){ CUBE.rotation.set(-(Math.PI/2), 0, 0); }
}

// HELPERS
function allFaces(onOff){
    if(onOff==0){
        face(1,0);
        face(2,0);
        face(3,0);
        face(4,0);
        face(5,0);
        face(6,0);
    }else if(onOff==1){
        face(1,1);
        face(2,1);
        face(3,1);
        face(4,1);
        face(5,1);
        face(6,1);
    }else{return} 
}

function face(faceNumber, onOff){
    let toggle = false;
    if(onOff=="1"){ toggle = true;}

    if(faceNumber==1){
        face1.visible = toggle;
    }else if(faceNumber==2){
        face2.visible = toggle;
    }else if(faceNumber==3){
        face3.visible = toggle;
    }else if(faceNumber==4){
        face4.visible = toggle;
    }else if(faceNumber==5){
        face5.visible = toggle;
    }else if(faceNumber==6){
        face6.visible = toggle;
    }
}