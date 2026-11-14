import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { CSS3DRenderer, CSS3DObject } from 'jsm/renderers/CSS3DRenderer.js';
import getStarfield from "./src/getStarfield.js";
import { getEarthMat } from "./src/getEarthMat.js";
import { getFresnelMat } from "./src/getFresnelMat.js";
import { setSkySphere_JPG } from "./src/SkysphereHelper.js";
import { explode } from "./src/explodePlanet.js";

// RENDERING FOR CSS3D OBJECTS
const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = "absolute";
cssRenderer.domElement.style.pointerEvents = "none";
cssRenderer.domElement.style.top = "0px";
document.body.appendChild(cssRenderer.domElement);
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

window.goToFace = goToFace;

// CAMERA
const fov = 75;
const aspect = w / h;
const near = 0.01;
const renderMax = 20000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, renderMax);
camera.position.set(-900, 1100, 2500);

// ---------- ADDING ITEMS ------------------------------------------------------------
const scene = new THREE.Scene();

// SKY SPHERE GALAXY 
setSkySphere_JPG(scene,"./textures/galaxy.jpg")

// CUBE 
const geo = new THREE.BoxGeometry(1000, 1000, 1000);
const mat = new THREE.MeshStandardMaterial({color: 0x27272a});
const CUBE = new THREE.Mesh(geo, mat);
scene.add(CUBE);

// MESH CUBES
const wireBox = new THREE.BoxGeometry(1000, 1000, 1000);
const wireMat = new THREE.MeshBasicMaterial({color: 0xffffff,wireframe: true});
const wireMesh = new THREE.Mesh(wireBox, wireMat);
scene.add(wireMesh);

// UI BUTTONS
const ui = new CSS3DObject(document.getElementById("ui"));
ui.position.set(-420, 60, 750);
ui.rotation.y = (Math.PI/4);
scene.add(ui)

// UI Keyboard Buttons
const wasd = new CSS3DObject(document.getElementById("wasd"));
wasd.position.set(420, -170, 800);
wasd.rotation.y = 0;
scene.add(wasd)

// UI : Initial Text
const initial = new CSS3DObject(document.getElementById("initial"));
initial.position.set(-848, 1110, 2350);
initial.rotation.y = 163;
initial.scale.setScalar(0.5);
scene.add(initial)


// HTML PAGES RENDER ON CUBE
const face1 = new CSS3DObject(document.getElementById("p1"));
const face2 = new CSS3DObject(document.getElementById("p2"));
const face3 = new CSS3DObject(document.getElementById("p3"));
const face4 = new CSS3DObject(document.getElementById("p4"));
const face5 = new CSS3DObject(document.getElementById("p5"));
const face6 = new CSS3DObject(document.getElementById("p6"));
face1.position.set(0,0,500);
face2.position.set(500,0,0);
face2.rotation.y = Math.PI/2;
face3.position.set(0,0,-500);
face3.rotation.y = Math.PI;
face4.position.set(-500,0,0);
face4.rotation.y = -(Math.PI/2);
face5.position.set(0,500,0);
face5.rotation.x = -(Math.PI/2);
face6.position.set(0,-500,0);
face6.rotation.x = Math.PI/2;
CUBE.add(face1);
CUBE.add(face2);
CUBE.add(face3);
CUBE.add(face4);
CUBE.add(face5);
CUBE.add(face6);

// Target Zoom
const targetRotation = new THREE.Quaternion();

// Initially - All Cube Faces Invisible
allFaces(0)

// ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// ---------------------- PLANETS AND STARS --------------------------------------------------
const loader = new THREE.TextureLoader();

// SUN
const sunRadius = 300;
const sunGeo = new THREE.IcosahedronGeometry(sunRadius,12);
const sunMat = new THREE.MeshBasicMaterial({map : loader.load("./textures/sun.jpg"),});
const sunMesh = new THREE.Mesh(sunGeo,sunMat);
sunMesh.rotation.z = -7.25 * Math.PI / 180;
sunMesh.position.set(0, 1250, 2500);
scene.add(sunMesh);
explode(scene, sunMesh);

// LIGHT
const sunLight = new THREE.DirectionalLight(0xffffff, 3);
sunLight.position.set(0, 1250, 2500);
scene.add(sunLight)


// STARS
const stars = getStarfield({ numStars: 1000, radius: 3700, size: 25 });
scene.add(stars)

// EARTH
const earthRadius = 50;
const sunDirection = new THREE.Vector3(5, 0.5, 2.5).normalize();
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
earthGroup.position.set(1400, 500, 5);
scene.add(earthGroup);
const earthGeo = new THREE.IcosahedronGeometry(earthRadius, 12);
const earthMesh = new THREE.Mesh(earthGeo, getEarthMat(sunDirection));
earthGroup.add(earthMesh);
const glowMesh = new THREE.Mesh(earthGeo, getFresnelMat());
glowMesh.scale.setScalar(1.02);
earthGroup.add(glowMesh);
explode(scene, earthGroup);

// Moon
const moonGeo = new THREE.IcosahedronGeometry(13,12);
const moonMat = new THREE.MeshStandardMaterial({map : loader.load("./textures/06_moonmap4k.jpg"),});
const moonMesh = new THREE.Mesh(moonGeo,moonMat);
moonMesh.rotation.z = -6.68 * Math.PI / 180;
moonMesh.position.set(1650, 550, 0);
scene.add(moonMesh);
explode(scene, moonMesh);

// Jupiter
const jupiterGeo = new THREE.IcosahedronGeometry(100,12);
const jupiterMat = new THREE.MeshStandardMaterial({map : loader.load("./textures/jupiter-4k.jpg"),});
const jupiterMesh = new THREE.Mesh(jupiterGeo,jupiterMat);
jupiterMesh.rotation.z = -3.13 * Math.PI / 180;
jupiterMesh.position.set(-1650, -350, -520);
scene.add(jupiterMesh);

// ALIEN
const jupiterPanel = new CSS3DObject(document.getElementById("jupiter"));
jupiterPanel.position.set(-1650, -300, -520);
scene.add(jupiterPanel);
loadPage("jupiter", "pages/jupiter.html");

// URANUS
const uranusGeo = new THREE.IcosahedronGeometry(35,12);
const uranusMat = new THREE.MeshStandardMaterial({map : loader.load("./textures/uranus.jpg"),});
const uranusMesh = new THREE.Mesh(uranusGeo,uranusMat);
uranusMesh.rotation.z = -3.13 * Math.PI / 180;
uranusMesh.position.set(1450, -1050, -520);
scene.add(uranusMesh);
explode(scene, uranusMesh);

// SATURN
const saturnGeo = new THREE.IcosahedronGeometry(82,12);
const saturnMat = new THREE.MeshStandardMaterial({map : loader.load("./textures/saturn.jpg"),});
const saturnMesh = new THREE.Mesh(saturnGeo,saturnMat);
saturnMesh.rotation.z = -3.13 * Math.PI / 180;
saturnMesh.position.set(2850, -350, -800);
scene.add(saturnMesh);
explode(scene, saturnMesh);

// SATURNS RING
const saturnRingWidth = 500;
const saturnRingHeight = 500;
const saturnRingGeo = new THREE.PlaneGeometry(saturnRingWidth, saturnRingHeight);
const saturnRingMat = new THREE.MeshBasicMaterial({
    map : loader.load("./textures/saturn-ring.png"),
    transparent: true,
    side : THREE.DoubleSide});
const saturnRingMesh = new THREE.Mesh(saturnRingGeo,saturnRingMat);
saturnRingMesh.rotation.x = -Math.PI / 2;
saturnRingMesh.rotation.y = 26.7 * Math.PI / 180;
saturnRingMesh.position.set(2850, -350, -800);
scene.add(saturnRingMesh);
explode(scene, saturnRingMesh);

// MARS
const marsGeo = new THREE.IcosahedronGeometry(82,12);
const marsMat = new THREE.MeshStandardMaterial({map : loader.load("./textures/mars.jpg"),});
const marsMesh = new THREE.Mesh(marsGeo,marsMat);
marsMesh.rotation.z = -3.13 * Math.PI / 180;
marsMesh.position.set(-2350, 950, -520);
scene.add(marsMesh);
explode(scene, marsMesh);

// ----------RENDERING & CONTROLS------------------------------------------------------------------------
let lastFace = null;
let currFace = null;

// Controls
let initZoom = false;
let freeMode = false;
let initialClick = false;
onmousedown = (e) => {initialClick = true;}

let frame = 0;

function animate(t = 0) {
    requestAnimationFrame(animate);

    // EARTH STARS PLANETS SPIN
    frame++;
    if(frame % 4 == 0){stars.userData.update(t);}
    earthMesh.rotation.y   += 0.005;
    moonMesh.rotation.y    += 0.00018;
    jupiterMesh.rotation.y += 0.0121;
    saturnMesh.rotation.y  += 0.0113;
    uranusMesh.rotation.y  -= 0.0070;
    sunMesh.rotation.y     += 0.0002;

    // STATE 1: before the user clicks, spin the cube
    if (!initialClick) {
        CUBE.visible = false;
        CUBE.rotation.y = -t * 0.0005;
        wireMesh.rotation.y = -t * 0.0005;
    }

    // STATE 2: first frame after the click, snap to face 1 (runs once)
    if (initialClick && !initZoom) {
        currFace = 1;
        CUBE.visible = true;
        wireMesh.visible = false;
        goToFace(1)
        camera.position.set(0, 0, 2500);

        initZoom = true;
        controls.enabled = false;
        face1.visible = true;
        setTimeout(() => {face1.element.style.opacity = "1";}, 50);
        setTimeout(() => {ui.element.style.opacity = "1";}, 50);
        setTimeout(() => {wasd.element.style.opacity = "1";}, 50);
    }

    if (initZoom  && !freeMode) {
        const rotationSpeed = 0.30; // higher = faster.
        camera.position.z += (1152 - camera.position.z) * 0.15;
        CUBE.quaternion.slerp(targetRotation, rotationSpeed);
    }

    controls.update();
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera);
}
animate();


// ================ KEYBOARD CONTROL AND MOVEMENT LOGIC =================================================================

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
        if (up)    {goToFace(5);}
        if (left)  {goToFace(4)}
        if (down)  {goToFace(6)}
        if (right) {goToFace(2)}
    }
    else if(currFace === 2){
        lastFace = currFace;
        if (up)    {goToFace(5)}
        if (left)  {goToFace(1)}
        if (down)  {goToFace(6)}
        if (right) {goToFace(3)}
    }
    else if(currFace === 3){
        lastFace = currFace;
        if (up)    {goToFace(5)}
        if (left)  {goToFace(2)}
        if (down)  {goToFace(6)}
        if (right) {goToFace(4)}
    }
    else if(currFace === 4){
        lastFace = currFace;
        if (up)    {goToFace(5)}
        if (left)  {goToFace(3)}
        if (down)  {goToFace(6)}
        if (right) {goToFace(1)}
    }
    // FACE 5 (top)
    else if(currFace === 5){
        if (down)  {goToFace(lastFace)}
    }
    // FACE 6 (bottom)
    else if(currFace === 6){
        if (up)    {goToFace(lastFace)}
    }
    if (e.key === "Escape") {
        controls.enabled = true; 
        freeMode = true; 
        allFaces(1)}

});

// Loads each html page into corresponding div
async function loadPage(divId, filePath) {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(divId).innerHTML = html;
}
await loadPage("ui", "pages/ui.html");
await loadPage("wasd", "pages/wasd.html");
await loadPage("initial", "pages/initial.html");
loadPage("p1", "pages/side1.html");
loadPage("p2", "pages/side2.html");
loadPage("p3", "pages/side3.html");
loadPage("p4", "pages/side4.html");
loadPage("p5", "pages/side5.html");
loadPage("p6", "pages/side6.html");


// ============= HELPER FUNCTIONS ============================================

function rotateFace(face){
    currFace = face;
    let x = 0;
    let y = 0;
    if(face === 2){ y = -(Math.PI/2); }
    else if(face === 3){ y = Math.PI; }
    else if(face === 4){ y = Math.PI/2; }
    else if(face === 5){ x = Math.PI/2; }
    else if(face === 6){ x = -(Math.PI/2); }
    targetRotation.setFromEuler(new THREE.Euler(x, y, 0));
}

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

function updateKeys() {
    let allowed = ["w", "a", "s", "d"];
    if (currFace === 5) { allowed = ["s"]; }
    if (currFace === 6) { allowed = ["w"]; }
    ["w", "a", "s", "d"].forEach((k) => {
        const key = document.getElementById("key-" + k);
        if (!key) { return; } 
        if (allowed.includes(k)) {key.classList.remove("opacity-20");
        } else {key.classList.add("opacity-20");}
    });
}

async function goToFace(nextFace){
    rotateFace(nextFace);
    face(nextFace, 1);
    updateKeys();
}