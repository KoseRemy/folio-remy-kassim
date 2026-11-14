import * as THREE from 'three';
import { CSS3DObject } from 'jsm/renderers/CSS3DRenderer.js';

let count = 0;

export function explode(scene, planet){
  // Create Div
  const div = document.createElement("div");
  div.id = "explode-" + count;
  count = count + 1;
  div.className = "w-[300px] h-[300px] cursor-pointer pointer-events-auto";

  // GIF that Plays - Currently Invisible - has ID
  const gif = document.createElement("img");
  gif.id = "gif-"+count;
  gif.className = "hidden w-[300px]";
  gif.src = "textures/explode.gif";
  div.appendChild(gif);
  div.onclick = () => onClick(div, gif, planet, invisPanel); // defines what happens if this element is clicked

  //JS Side : Create Panel and Position It
  const invisPanel = new CSS3DObject(div);
  invisPanel.position.copy(planet.position);
  invisPanel.position.z += 10;
  scene.add(invisPanel);

  return invisPanel;
}

// When clicked - Gif appears, planet invisible, gif runs a short moment.
function onClick(div, gif, planet, panel){
    planet.visible = false;
    gif.classList.remove("hidden");
    setTimeout(() => { panel.visible = false; }, 800);
}