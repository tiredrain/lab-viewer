import * as THREE from './build/three.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';

const config = {
  lab_type: "chemistry",
  area: 48,
  dimensions: { length_m: 6, width_m: 8 },
  elements: [
    { type: "fume_hood", count: 1 },
    { type: "workbench", count: 1 },
    { type: "freezer", count: 1 }
  ]
};
console.log('main.js loaded!');

const { length_m, width_m } = config.dimensions;
const elements = config.elements;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const floorGeometry = new THREE.PlaneGeometry(length_m, width_m);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

const ambient = new THREE.AmbientLight(0x888888);
scene.add(ambient);

const colors = {
  workbench: 0x0077be,
  fume_hood: 0xff5555,
  freezer: 0x00cc66
};

elements.forEach((element, index) => {
  const boxSize = 1;
  const spacing = 2;
  for (let i = 0; i < element.count; i++) {
    const geometry = new THREE.BoxGeometry(boxSize, 1, boxSize);
    const material = new THREE.MeshStandardMaterial({ color: colors[element.type] || 0x888888 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      -length_m/2 + 1.5 + (index * spacing),
      0.5,
      -width_m/2 + 1.5 + (i * spacing)
    );
    scene.add(mesh);
  }
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
