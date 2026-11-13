import * as THREE from "three";

export default function getStarfield({ numStars = 500, radius = 25, size = 0.2 } = {}) {

  // pick a random point on a sphere shell between radius and 2x radius
  function randomSpherePoint() {
    const dist = Math.random() * radius + radius;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const x = dist * Math.sin(phi) * Math.cos(theta);
    const y = dist * Math.sin(phi) * Math.sin(theta);
    const z = dist * Math.cos(phi);

    // twinkle settings for this star
    const rate = Math.random() * 0.005;
    const prob = Math.random();
    const light = Math.random();
    function update(t) {
      if (prob > 0.9) {
        return light + Math.sin(t * rate);
      }
      return light;
    }

    return { pos: new THREE.Vector3(x, y, z), update };
  }

  // build every star
  const verts = [];
  const colors = [];
  const stars = [];
  for (let i = 0; i < numStars; i += 1) {
    const p = randomSpherePoint();
    stars.push(p);
    const col = new THREE.Color().setHSL(0.6, 0.2, Math.random());
    verts.push(p.pos.x, p.pos.y, p.pos.z);
    colors.push(col.r, col.g, col.b);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: size,
    vertexColors: true,
    map: new THREE.TextureLoader().load("./textures/stars/circle.png"),
  });

  const points = new THREE.Points(geo, mat);

  // called every frame: slowly spin and twinkle
  function update(t) {
    points.rotation.y -= 0.0001;
    const newColors = [];
    for (let i = 0; i < numStars; i += 1) {
      const bright = stars[i].update(t);
      const col = new THREE.Color().setHSL(0.6, 0.2, bright);
      newColors.push(col.r, col.g, col.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(newColors, 3));
  }

  points.userData = { update };
  return points;
}